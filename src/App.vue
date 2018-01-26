<template>
  <div id="app">
    <header>
      <h1>Projeto</h1>
    </header>
    <nav>
      <ul>
        <li><router-link :to="{name: 'home'}">Home</router-link></li>
        <li><router-link :to="{name: 'about'}">About</router-link></li>
        <li><router-link :to="{name: 'auth'}">Login</router-link></li>
      </ul>
    </nav>
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
