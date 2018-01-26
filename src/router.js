import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home'
import About from './components/About'
import Auth from './components/Auth'

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
      }
    ],
	  mode: 'history',
})
