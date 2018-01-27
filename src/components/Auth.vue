<template>
	<div id="root">
    <form  @submit.prevent="submit">
  		<input type="email" placeholder="Email" v-model="email">
  		<input type="password" placeholder="Senha" v-model="password">
  		<button type="submit" :disabled="btn.disabled">{{btn.label}}</button>
    </form>
	</div>
</template>

<script>
export default {

  name: 'auth',

  data () {
    return {
      email: 'lennonsbueno@gmail.com',
      password: 'santos09',
			btn: {
				disabled: false,
				label: 'entrar'
			}
    }
  },
	mounted () {
		if (this.$store.getters.logado) {
			this.$router.push({ name: 'home' })
		}
  },
  methods: {
  	submit () {
			this.btn.label = 'processando..'
			this.btn.disabled = true

	    const { email, password } = this

	    if (email !== '' && password !== '') {
	      this.$auth.signInWithEmailAndPassword(
	        email, password
	      )
	    }
	  }
  }
}
</script>

<style lang="css" scoped>
	#root {
		align-items: center;
		display: flex;
		height: calc(100% - 147px);
		justify-content: center;
		position: absolute;
		width: 100%;
	}
	form {
		background-color: #c8d6e5;
		border: 1px solid rgba(0,0,0,.1);
		box-shadow: 0px 0px 20px #ddd;
		padding: 40px;
		width: 400px;
	}
	input {
		background-color: transparent;
		border: 1px solid rgba(0,0,0,.1);
		border-radius: 5px;
		color: #8395a7;
		font-size: 17px;
		height: 40px;
		margin-bottom: 20px;
		text-indent: 10px;
		width: 100%;
	}
	input:focus {outline: none; background-color: rgba(255,255,255,.2)}
	button {
		cursor: pointer;
		padding: 5px 20px;
	}
</style>
