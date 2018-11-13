<template>
  <div class="root">
    <h2>Relatório de Vendas (Total R$ {{(totalDevedor).toFixed(2)}})</h2>
    <div class="inputs">
      <label>
        <input type="radio" name="vendas" value="0" v-model="radio" @click="carregarVendas(false)" /> Pendentes
      </label>
      <label>
        <input type="radio" name="vendas" value="1" v-model="radio" @click="carregarVendas(true)" /> Finalizadas
      </label>
    </div>
    <table class="table">
      <caption>Pendentes</caption>
      <tr>
        <th><a @click.prevent="ordernarLista('clientenome')" href="#">Nome cliente</a></th>
        <th><a @click.prevent="ordernarLista('datacompra')" href="#">Data</a></th>
        <th><a @click.prevent="ordernarLista('produtonome')" href="#">Produto</a></th>
        <th width="90"><a @click.prevent="ordernarLista('produtovalor')" href="#">Preço</a></th>
        <th><a @click.prevent="ordernarLista('produtoqte')" href="#">Quantidade</a></th>
        <th>
          <a @click.prevent="ordernarLista('total')" href="#">
            <span v-if="radio === '0'">Valor pendente</span>
            <span v-else>Valor pago</span>
          </a>
        </th>
        <th v-if="radio === '0'">Opção</th>
      </tr>
      <tr v-for="(l, index) in listaComputada" :key="index">
        <td><a @click.prevent="selecionarCliente(l.clientecod)" href="#">{{l.clientenome}}</a></td>
        <td>{{moment(l.datacompra).format('DD/MM/YYYY HH:mm')}}</td>
        <td>{{l.produtonome}}</td>
        <td>R$ {{(l.produtovalor).toFixed(2)}}</td>
        <td>{{l.produtoqte}}</td>
        <td>R$ {{l.total}}</td>
        <td v-if="radio === '0'"><button @click.prevent="marcarPago(l.vendacod)">Pagar</button> </td>
      </tr>
    </table>

    <div v-if="clienteSelecionado" id="modalSuccess" class="modal">
      <div class="modal-content">
        <div class="modal-header header-danger">
          <span class="modal-header-title">Cliente: {{clienteSelecionado.nome}}</span>
          <a href="#" class="header-btn-close">&#215;</a>
        </div> <!-- .modal-header -->
        <h1>Saldo devedor: R$ {{(clienteSelecionado.totalDevedor).toFixed(2)}}</h1>
      </div> <!-- .modal-content -->
    </div>
  </div>
</template>

<script>
import { orderBy, groupBy } from 'lodash'

export default {

  name: 'pendentes',

  data () {
    return {
      radio: "0",
      lista: [],
      clienteSelecionado: {
        nome: '',
        totalDevedor: 0
      },
      configs: {
        order: 'asc',
        orderBy: 'datacompra'
      }
    }
  },
  mounted () {
    this.carregarVendas(false)
  },
  computed : {
    listaComputada () {
      return orderBy(this.lista, this.configs.orderBy, this.configs.order);
    },
    totalDevedor() {
      return this.listaComputada.reduce( function( prevVal, elem ) {
          return prevVal + parseFloat(elem.total)
      }, 0)
    },
    listaAgrupada () {
      return groupBy(this.lista, 'clientecod')
    }
  },
  methods: {
    carregarVendas (value) {
      this.$db.ref(`users/${this.$store.getters.user.uid}/vendas`)
        .orderByChild('pagamentostatus')
        .equalTo(value)
        .on('value', data => {
          this.lista = data.val()
      })
    },
    marcarPago (vendacod) {
      const remove = confirm('Deseja marcar como pago esta venda?')

      if (remove) {
        var updates = {}

        updates['/pagamentostatus/'] = true
        updates['/datapagamento/'] = new Date().getTime()

        this.$db.ref(`users/${this.$store.getters.user.uid}/vendas`)
          .child(vendacod).update(updates)
      }
    },
    ordernarLista (campo) {
      if(this.configs.order == 'asc')
          this.configs.order = 'desc'
      else
          this.configs.order = 'asc'

      this.configs.orderBy = campo
    },
    selecionarCliente (idcliente) {
      const totalDevedor = this.listaAgrupada[idcliente].reduce( function( prevVal, elem ) {
          return prevVal + parseFloat(elem.total)
      }, 0)

      this.clienteSelecionado.totalDevedor = totalDevedor
      this.clienteSelecionado.nome = this.listaAgrupada[idcliente][0].clientenome

      window.location.href = "#modalSuccess"
    }
  }
}
</script>

<style lang="css" scoped>
  th a {color: #111}

  .inputs {
    padding: 0 0 20px 0;
  }
  .inputs label {
    cursor: pointer;
    margin-right: 20px;
  }
</style>
