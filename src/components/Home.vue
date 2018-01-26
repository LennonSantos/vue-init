<template>
	<div>
		Home page <b>{{count}}</b>
    <button @click="increment">Increment</button>
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
  	increment () {
  		this.$store.commit('increment', {amount: 1})
  	}
  },
  computed: {
  	count () {
  		return this.$store.getters.count
  	}
  }
}
</script>

<style lang="css" scoped>
</style>