import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAt7bTafp0DGBQYu0r9krAtVrzEe9966s8',
  authDomain: 'vendas-app-lennon.firebaseapp.com',
  databaseURL: 'https://vendas-app-lennon.firebaseio.com',
  projectId: 'vendas-app-lennon',
  storageBucket: '',
  messagingSenderId: '612409162434'
}

const connection = Firebase.initializeApp(config)
const DB = connection.database()
const AUTH = connection.auth()
const providerGoogle = new Firebase.auth.GoogleAuthProvider()

export default function install (Vue, { router }) {
  // AUTH.onAuthStateChanged(user => {
  //   if (!user) {
  //     router.push({ name: 'auth' })
  //   }
  // })

  Object.defineProperties(Vue.prototype, {
    $db: {
      get () {
        return DB
      }
    },
    $auth: {
      get () {
        return AUTH
      }
    },
    $google: {
      get () {
        return providerGoogle
      }
    }
  })
}
