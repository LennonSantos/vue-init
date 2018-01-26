<template>
	<div id="root">
    <form  @submit.prevent="submit">
  		<input type="email" placeholder="Email" v-model="email">
  		<input type="password" placeholder="Senha" v-model="password">
  		<button type="submit">entrar</button>
    </form>
	</div>
</template>

<script>
export default {

  name: 'auth',

  data () {
    return {
      email: 'lennonsbueno@gmail.com',
      password: 'santos09'
    }
  },
  methods: {
  	submit () {
	    const { email, password } = this
	    if (email !== '' && password !== '') {
	      this.$auth.signInWithEmailAndPassword(
	        email, password
	      )
	    }
	  }
  },
  mounted () {
    this.$auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>