<template>
	<div class="root">
		<div class="pdv">
			<form @submit.prevent="finalizar">
			<label for="txtProdutos">Produto</label>
			<select id="txtProdutos" class="produtos" v-model="produto" required>
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
						<select v-model="cliente" :required="clienteObrigatorio" title="Vendas a prazo é obrigatório cliente">
							<option :value="c" v-for="c  in clientes">{{c.nome}}</option>
						</select>

						<label for="">Pagamento</label>
						<select v-model="pagamento">
							<option value="aprazo">A Prazo</option>
							<option value="avista">A vista</option>
						</select>

						<button type="submit">Finalizar venda</button>


				</div>
			</div>
			</form>
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
			cliente: {id: 0, nome: 'nenhum'},
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

			const pago = this.pagamento == 'avista' ? true : false
			const datapagamento = this.pagamento == 'avista' ? new Date().getTime() : ''

			const clientecod = this.cliente.id != undefined ? this.cliente.id : 0
			const clientenome = this.cliente.nome != undefined ? this.cliente.nome : 0

			const venda = {
				produtocod: this.produto.id,
				produtonome: this.produto.nome,
				produtovalor: parseInt(this.produto.preco),
				produtoqte: parseInt(this.quantidade),
				clientecod: clientecod,
				clientenome: clientenome,
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
		},
		clienteObrigatorio () {
			return (this.pagamento == "aprazo") ? true : false
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
