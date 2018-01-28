<template>
	<div class="root">
		<form @submit.prevent="submit"
					autocomplete="off">
  		<button type="submit" :disabled="btn.disabled">{{btn.label}}</button>
    </form>
	</div>
</template>

<script>
export default {

  name: 'auth',

  data () {
    return {
			singin: false,
      email: 'lennonsbueno@gmail.com',
      password: 'santos09',
			btn: {
				disabled: false,
				label: 'entrar com login do google'
			},
			btnConta: {
				disabled: false,
				label: 'criar conta'
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

			var provider = this.$google

			this.$auth.signInWithPopup(provider).catch((error) => {
				this.btn.label = 'entrar com login do google'
				this.btn.disabled = false
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
				alert(errorMessage)
      })
	  }
  }
}
</script>

<style lang="css" scoped>
	.root {
		align-items: center;
		display: flex;
		justify-content: center;
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
	input:-webkit-autofill {
	    -webkit-box-shadow: 0 0 0 30px #c8d6e5 inset;
			-webkit-text-fill-color: #8395a7;
			border: 1px solid #8395a7;
	}
	button {
		background-color: #e74c3c;
		border: none;
		color: #fff;
		cursor: pointer;
		padding: 5px 20px;
		font-size: 17px;
		margin: 0 auto;
		display: block;
	}
</style>
