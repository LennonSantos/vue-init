<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title">Controle de vendas</h1>
      <button class="header-btn-logout"
              @click="logout"
              v-if="logado">sair</button>
    </header>
    <nav class="nav">
      <ul class="menu">
        <li class="menu-item" v-if="logado">
          <router-link :to="{name: 'home'}">Home</router-link>
        </li>
        <li class="menu-item" v-if="logado">
          <router-link :to="{name: 'about'}">About</router-link>
        </li>
        <li class="menu-item" v-if="!logado">
          <router-link :to="{name: 'auth'}">Login</router-link>
        </li>
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
  methods: {
    logout () {
      this.$auth.signOut()
    }
  },
  computed: {
  	logado () {
  		return this.$store.getters.logado
  	}
  },
  mounted () {
    this.$auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push({ name: 'home' })
				this.$store.commit('login', true)
      }
			else {
        this.$router.push({ name: 'auth' })
				this.$store.commit('login', false)
			}
    })
  },
  watch: {
    '$route' (to, from) {
      if (!this.logado) {
        this.$router.push({ name: 'auth' })
      }
    }
  }
}
</script>

<style>
</style>
