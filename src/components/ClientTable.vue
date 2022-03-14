<template>
	<div class="client-table">
		<div class="client-table__input--contain">
			<div class="client-table__input--title">
				Начальный капитал, $
			</div>
			<input
				step="100"
				min="1000"
				type="number"
				class="form-control"

				v-model="deposit"
			>
			<div class="client-table__input--title">
				Доходность инвестиций, %
			</div>
			<input
				step="1"
				type="number"
				class="form-control"

				v-model="percent"
			>
			<div class="client-table__input--title">
				Сумма ежемесячного пополнения счета, $
			</div>
			<input
				step="100"
				min="100"
				type="number"
				class="form-control"

				v-model="additions"
			>
		</div>
		<div v-if="showTable" class="client-table__table">
			<div class="client-table__header">
				<h3>Простой процент</h3>
				<h3>Сложный процент</h3>
				<h3>Сложный процент + пополнения</h3>
			</div>
			<div class="client-table__body">
				<div class="paint">
					<div v-for="n in 10" :key="n">
						{{ +deposit + (deposit * (percent/100) * n) | number0}}
					</div>
				</div>
				<div class="complex">
					<div v-for="n in 10" :key="n">
						{{ +deposit + (deposit * (1 + percent/100)**n) | number0}}
					</div>
				</div>
				<div class="complex-plus">
					complex-plus
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ClientTable',
	data: () => ({
		showTable: false,
		deposit: 0,
		percent: 0,
		additions: 0,
	}),
	props: {
		client: {
			type: Object
		}
	},
	created(){
		this.deposit = this.client.table.deposit;
		this.percent = this.client.table.percent;
		this.additions = this.client.table.additions;
	}
}

</script>

<style scoped lang="scss">

	.client-table {
		border: 1px solid black;

		&__input {
			&--contain {
				display: grid;
				grid-template-rows: repeat(3, 40px);
				grid-template-columns: repeat(2, 1fr);
				grid-gap: padding();
				padding: padding();

				width: 33%;

				outline: 1px solid coral;
			}

			&--title {
				font-size: $font-size-regular;
			}

			@include input;
			padding: padding();
		}

		&__header, &__body {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}

		&__body {
			grid-gap: padding();
		}
	}

</style>