<template>
	<div id="root">
    <button @click="logout">sair</button>
	</div>
</template>

<script>
export default {

  name: 'Home',

  data () {
    return {
    }
  },
  methods: {
  	// increment () {
  	// 	this.$store.commit('increment', {amount: 1})
  	// }
    logout () {
      this.$auth.signOut()
    }
  },
  computed: {
  	// count () {
  	// 	return this.$store.getters.count
  	// }
  }
}
</script>

<style lang="css" scoped>
</style>