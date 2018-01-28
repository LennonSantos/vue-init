import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home'
import About from './components/About'
import Auth from './components/Auth'
import Produtos from './components/Produtos'
import Clientes from './components/Clientes'
import Pendentes from './components/Pendentes'

Vue.use(Router);

export default new Router({
  	routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        component: About
      },
      {
        path: '/auth',
        name: 'auth',
        component: Auth
      },
      {
        path: '/produtos',
        name: 'produtos',
        component: Produtos
      },
      {
        path: '/clientes',
        name: 'clientes',
        component: Clientes
      },
      {
        path: '/vendas/pendentes',
        name: 'pendentes',
        component: Pendentes
      }
    ],
	  mode: 'history',
})
