<template>
	<div class="root">
		<div class="pdv">
			<label for="txtProdutos">Produto</label>
			<select id="txtProdutos" class="produtos" v-model="produto">
				<option v-for="p in produtos" :value="p">{{p.nome}}</option>
			</select>
			<div class="coluna-50">
				<div class="campos">
					<label for="">Código</label>
					<input type="text" placeholder="Código" disabled v-model="produto.id">

					<label for="">Quantidade</label>
					<input type="number" placeholder="Quantidade" v-model="quantidade">

					<label for="">Valor unitário</label>
					<input type="text" placeholder="Valor unitário" disabled v-model="produto.preco">

					<label for="">Valor total</label>
					<input type="text" placeholder="Valor total" disabled :value="valorTotal">

					<label for="">Cliente</label>
					<select v-model="cliente">
						<option :value="c" v-for="c  in clientes">{{c.nome}}</option>
					</select>

					<label for="">Pagamento</label>
					<select v-model="pagamento">
						<option value="aprazo">A Prazo</option>
						<option value="avista">A vista</option>
					</select>
				</div>
			</div>
			<div class="coluna-50">
				<div class="demonstrativo">
					<p v-if="valorTotal > 0">
						Código do produto: {{produto.id}} <br>
						Nome do produto: {{produto.nome}} <br>
						Valor unitário: R$ {{produto.preco}} <br>
						Quantidade: {{quantidade}} <br>
						----------------------------------- <br>
						Cliente: {{cliente.nome}} <br>
						Código cliente: {{cliente.id}} <br>
						----------------------------------- <br>
						total: R${{valorTotal}} - {{pagamento}} <br>
						----------------------------------- <br><br>
						<button type="button" @click="finalizar">Finalizar venda</button>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { map } from 'lodash'

export default {

  name: 'Home',

  data () {
    return {
			clientes: [],
			cliente: {},
			produtos: [],
			produto: {
				preco: 0
			},
			quantidade: 1,
			pagamento: 'aprazo'
    }
  },
  methods: {
		finalizar () {

			var pago = false
			var datapagamento = ''

			if (this.pagamento == 'avista') {
				pago = true
				datapagamento = new Date().getTime()
			}

			const venda = {
				produtocod: this.produto.id,
				produtonome: this.produto.nome,
				produtovalor: parseInt(this.produto.preco),
				produtoqte: parseInt(this.quantidade),
				clientecod: this.cliente.id,
				clientenome: this.cliente.nome,
				pagamento: this.pagamento,
				total: this.valorTotal,
				datacompra: new Date().getTime(),
				datapagamento: datapagamento,
				pagamentostatus: pago
			}

			this.$db.ref(`users/${this.$store.getters.user.uid}/vendas`).push(venda)
        .then(res => {
          this.limpar()

					this.$db.ref(`users/${this.$store.getters.user.uid}/vendas`)
		        .child(res.getKey()).child('vendacod').set(res.getKey())

          alert(`Venda salva com sucesso! \n id: ${res.getKey()}`)
        })
        .catch(error => {
          alert(error.message)
        })
		},
		limpar () {
			this.quantidade =  1
			this.cliente = {}
			this.produto = {}
		}
  },
  computed: {
		user () {
			return this.$store.getters.user
		},
		valorTotal () {
			return (this.produto.preco * this.quantidade).toFixed(2)
		}
  },
	mounted () {
    this.$db.ref(`users/${this.$store.getters.user.uid}/produtos`).on('value', data => {
      const obj = data.val()

      this.produtos = map(obj, (expense, index) => {
				expense.id = index
        return expense
      })
    })

		this.$db.ref(`users/${this.$store.getters.user.uid}/clientes`).on('value', data => {
      const obj = data.val()

      this.clientes = map(obj, (expense, index) => {
				expense.id = index
        return expense
      })
    })
  },
}
</script>

<style lang="css" scoped>
	button{
		cursor: pointer;
			padding: 5px 20px;
	}

	.coluna-50 {
		height: calc(100% - 77px);
		float: left;
		width: 50%;
	}

	.campos input, .campos select {
		display: block;
		height: 40px;
		margin-bottom: 20px;
		text-indent: 10px;
		width: calc(100% - 20px);
	}

	.demonstrativo, .campos {
		margin-top: 20px;
		width: 100%;
		height: calc(100% - 20px);
	}

	.demonstrativo {
		background-color: #ddd;
		border: 1px solid #ccc;
		border-radius: 50px;
		padding: 20px;
	}

	.pdv {
		/* background: #ddd; */
		height: 100%;
		width: 100%;
	}

	.produtos {
		background-color: transparent;
		font-size: 30px;
		height: 60px;
		width: 100%;
	}
</style>
