<template>
  <div id="app">
     <router-link :to="{name: 'home'}">Home</router-link>
     <router-link :to="{name: 'about'}">About</router-link>
     <router-link :to="{name: 'auth'}">Login</router-link>
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  watch: {
    '$route' (to, from) {
      this.$auth.onAuthStateChanged(user => {
        if (!user) {
          this.$router.push({ name: 'auth' })
        }
      })
    }
  }
}
</script>

<style>
</style>
