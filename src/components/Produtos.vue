<template>
  <div class="root">
    <h2>Cadastrar produtos</h2>

    <form class="form" @submit.prevent="cadastrar">
      <div class="form-row">
        <input type="text"
               placeholder="Nome"
               v-model="produto.nome">
        <input type="number"
               placeholder="Preço"
               v-model="produto.preco">
        <input type="number"
               placeholder="Em estoque"
               v-model="produto.estoque">
      </div>
      <button type="submit">cadastrar</button>
    </form>

    <table class="table">
      <!-- <caption>Produtos cadastrados</caption> -->
      <tr>
        <th>Nome</th>
        <th>Preço</th>
        <th>Estoque</th>
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
                 :value="l.preco"
                 @input="update(l.id, $event.target.value, 'preco')">
        </td>
        <td>
          <input type="text"
                 :value="l.estoque"
                 @input="update(l.id, $event.target.value, 'estoque')">
        </td>
        <td><a href="#" @click="remove(l.id)">x</a></td>
      </tr>
    </table>

  </div>
</template>

<script>
import { map } from 'lodash'

export default {

  name: 'produtos',

  data () {
    return {
      lista: [],
      produto : {
        nome: '',
        preco: '',
        estoque: ''
      }
    }
  },
  computed: {
    uid () {
      return this.$store.getters.user.uid
    }
  },
  mounted () {
    this.$db.ref(`users/${this.uid}/produtos`).on('value', data => {
      const obj = data.val()

      this.lista = map(obj, (expense, index) => {
        expense.id = index
        return expense
      })
    })
  },
  methods: {
    cadastrar () {
      this.$db.ref(`users/${this.uid}/produtos`).push(this.produto)
        .then(res => {
          this.limpar()
          alert(`Produto salvo com sucesso! \n id: ${res.getKey()}`)
        })
        .catch(error => {
          alert(error.message)
        })
    },
    limpar () {
      this.produto.nome = ''
      this.produto.preco = ''
      this.produto.estoque = ''
    },
    update (id, value, campo) {
      this.$db.ref(`users/${this.uid}/produtos`).child(id).child(campo).set(value)
    },
    remove (id) {
      const remove = confirm('Deseja excluir o produto?')

      if(remove) {
        this.$db.ref(`users/${this.uid}/produtos`).child(id).remove()
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
