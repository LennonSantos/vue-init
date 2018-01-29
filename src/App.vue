<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title">Controle de vendas</h1>
    </header>
    <nav class="nav">
      <ul class="menu">
        <li class="menu-item" v-if="logado">
          <router-link :to="{name: 'home'}">Início</router-link>
        </li>
        <li class="menu-item" v-if="logado">
          <router-link :to="{name: 'produtos'}">Produtos</router-link>
        </li>
        <li class="menu-item" v-if="logado">
          <router-link :to="{name: 'clientes'}">Clientes</router-link>
        </li>
        <li class="menu-item" v-if="logado">
          <router-link :to="{name: 'pendentes'}">Vendas pendentes</router-link>
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
    <footer class="footer" v-if="logado">
      <p>Olá, {{user.displayName}}</p>
      <button class="btn-logout"
              @click="logout"
              v-if="logado">sair</button>
    </footer>
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
  	},
    user () {
			return this.$store.getters.user
		}
  },
  mounted () {
    this.$auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push({ name: 'home' })

        var dados ={
          uid: user.uid,
          displayName: user.displayName
        }

				this.$store.commit('login', {logado: true, user: dados})
      }
			else {
        this.$router.push({ name: 'auth' })
				this.$store.commit('login', {logado: false, user: {}})
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

<style scoped>
  .footer{
    align-items: center;
    background: rgba(255,255,255,.1);
    bottom: 0;
    display: flex;
    justify-content: space-between;
    left: 0;
    padding: 20px;
    position: absolute;
    width: 25%;
  }
  .btn-logout {
    background-color: rgba(255,255,255,.3);
    border: none;
    border-radius: 5px;
    color: #444;
    cursor: pointer;
    padding: 5px 20px;
  }

  .header {
  	align-items: center;
  	background-color: #079992;
  	display: flex;
    height: 15%;
  	justify-content: center;
  	padding: 20px;
    width: 25%;
  }
  .header-title{
  	color: #eee;
  	font-size: 20px;
  	font-weight: normal;
  }

  .nav {
  	background-color: #38ada9;
    height: 85%;
    position: relative;
    width: 25%;
  }

  .menu {
  	font-size: 0;
  	list-style: none;
  }
  .menu-item {
  	display: block;
  }
  .menu-item a {
  	border-bottom: 1px solid rgba(0,0,0,.1);
  	color: #444;
  	display: block;
  	font-size: 15px;
    padding: 15px 20px;
    position: relative;
  	text-decoration: none;
  }
  .menu-item a:hover, .menu-item a.router-link-exact-active {
    background-color: rgba(255,255,255,.1);
    color: #333;
    text-decoration: underline;
  }
  .menu-item a.router-link-exact-active::after {
    border-color: transparent transparent transparent #4cb5b2;
    border-width: 24px 24px 24px 24px;
    border-style: solid;
    content: "";
    position: absolute;
    left: 100%;
    top: 0px;
  }
</style>
