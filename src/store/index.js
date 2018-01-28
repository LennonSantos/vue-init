import Vue from 'vue'
import Vuex from 'vuex'
import {firebaseMutations, firebaseAction} from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  // VuexFire will check the type of the property to bind as an array or as
  // an object
  strict: true,
  state: {
    user: {},
    logado: false
  },
  mutations: {
    ...firebaseMutations,
    login (state, payload) {
      state.logado = payload.logado
      state.user = payload.user
    }
  },
  getters: {
    user: state => state.user,
    logado: state =>state.logado
  },
  actions: {
    setUserRef: firebaseAction(({
      bindFirebaseRef
    }, ref) => {
      bindFirebaseRef('user', ref)
    })
  }
})
