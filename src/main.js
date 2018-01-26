import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import firebase from './plugins/firebase'

Vue.use(firebase, { router })

new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
})
