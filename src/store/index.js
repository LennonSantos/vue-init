import Vue from 'vue'
import Vuex from 'vuex'
import {firebaseMutations, firebaseAction} from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  // VuexFire will check the type of the property to bind as an array or as
  // an object
  strict: true,
  state: {
    todos: [],
    logado: false
  },
  mutations: {
    ...firebaseMutations,
    login (state, n) {
      state.logado = n
    }
  },
  getters: {
    todos: state => state.todos,
    logado: state =>state.logado
  },
  actions: {
    setTodosRef: firebaseAction(({
      bindFirebaseRef
    }, ref) => {
      bindFirebaseRef('todos', ref)
    })
  }
})
