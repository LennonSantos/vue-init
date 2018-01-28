<template>
  <div class="root">
    <h2>Cadastrar clientes</h2>

    <form class="form" @submit.prevent="cadastrar">
      <div class="form-row">
        <input type="text"
               placeholder="Nome"
               v-model="cliente.nome">
        <input type="email"
               placeholder="Email"
               v-model="cliente.email">
        <input type="text"
               placeholder="Telefone"
               v-model="cliente.telefone">
         <input type="text"
                placeholder="Observação"
                v-model="cliente.obs">
      </div>
      <button type="submit">cadastrar</button>
    </form>

    <table class="table">
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Telefone</th>
        <th>Observação</th>
        <th>Excluir</th>
      </tr>
      <tr v-for="l in lista">
        <td>
          <input type="text"
                 :value="l.nome"
                 @input="update(l.id, $event.target.value, 'nome')">
        </td>
        <td>
          <input type="text"
                 :value="l.email"
                 @input="update(l.id, $event.target.value, 'email')">
        </td>
        <td>
          <input type="text"
                 :value="l.telefone"
                 @input="update(l.id, $event.target.value, 'telefone')">
        </td>
        <td>
          <input type="text"
                 :value="l.obs"
                 @input="update(l.id, $event.target.value, 'obs')">
        </td>
        <td><a href="#" @click="remove(l.id)">x</a></td>
      </tr>
    </table>

  </div>
</template>

<script>
import { map } from 'lodash'

export default {

  name: 'clientes',

  data () {
    return {
      lista: [],
      cliente : {
        nome: '',
        email: '',
        telefone: '',
        obs: ''
      }
    }
  },
  computed: {
    uid () {
      return this.$store.getters.user.uid
    }
  },
  mounted () {
    this.$db.ref(`users/${this.uid}/clientes`).on('value', data => {
      const obj = data.val()

      this.lista = map(obj, (expense, index) => {
        expense.id = index
        return expense
      })
    })
  },
  methods: {
    cadastrar () {
      this.$db.ref(`users/${this.uid}/clientes`).push(this.cliente)
        .then(res => {
          this.limpar()
          alert(`Cliente salvo com sucesso! \n id: ${res.getKey()}`)
        })
        .catch(error => {
          alert(error.message)
        })
    },
    limpar () {
      this.cliente.nome = ''
      this.cliente.email = ''
      this.cliente.telefone = ''
      this.cliente.obs = ''
    },
    update (id, value, campo) {
      this.$db.ref(`users/${this.uid}/clientes`).child(id).child(campo).set(value)
    },
    remove (id) {
      const remove = confirm('Deseja excluir o cliente?')

      if(remove) {
        this.$db.ref(`users/${this.uid}/clientes`).child(id).remove()
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
