<template>
	<div class="client-table">
		<div class="client-table__input--contain">
			<div class="client-table__input--title">Начальный капитал, $</div>
			<input
				step="100"
				min="1000"
				type="number"
				class="form-control"
				v-model="deposit"
			/>
			<div class="client-table__input--title">Доходность инвестиций, %</div>
			<input step="1" type="number" class="form-control" v-model="percent" />
			<div class="client-table__input--title">
				Сумма ежемесячного пополнения счета, $
			</div>
			<input
				step="100"
				min="100"
				type="number"
				class="form-control"
				v-model="additions"
			/>
		</div>
		<div v-if="showTable" class="client-table__table">
			<div class="client-table__header">
				<h3>Простой процент</h3>
				<h3>Сложный процент</h3>
				<h3>Сложный процент + пополнения</h3>
			</div>
			<div class="client-table__body">
				<div v-for="(c, i) in table" :key="i" class="client-table__column">
					<div>
						<div class="client-table--item">
							<div>Период, год</div>
							<div>Баланс</div>
						</div>
						<div v-for="(n, i) in c" :key="i" class="client-table--item">
							<div>{{ i + 1 }}</div>
							<div>{{ n | number2 | dollar }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ClientTable',
	data: () => ({
		showTable: true,
		deposit: 0,
		percent: 0,
		additions: 0,
		tableSize: 10,
	}),
	props: {
		client: {
			type: Object,
		},
	},
	created() {
		this.deposit = 4000; //this.client.table.deposit;
		this.percent = 12; //this.client.table.percent;
		this.additions = 0; //this.client.table.additions;
	},
	computed: {
		table() {
			const getPercents = (n) => n / 100 * this.percent;

			const painPerc = Array(this.tableSize)
				.fill(+this.deposit)
				.map((n, i) => n + getPercents(n) * (i + 1));

			let lastSumm = +this.deposit;
			const complexPerc = [...Array(this.tableSize)]
				.map(() => lastSumm = lastSumm + getPercents(lastSumm));

			let lastComplexSum = +this.deposit;
			const complexPercWidthAdds = [...Array(this.tableSize)]
				.map(() =>
					lastComplexSum = (lastComplexSum + getPercents(lastComplexSum) + +this.additions)
				);

			return [painPerc, complexPerc, complexPercWidthAdds];
		},
	},
};
</script>

<style scoped lang="scss">
.client-table {
	border: 1px solid black;

	&__input {
		&--contain {
			display: grid;
			grid-template-rows: repeat(3, 40px);
			grid-template-columns: repeat(180px, 150px);
			grid-gap: padding();
			padding: padding();

			// width: 33%;
			width: max-content;

			outline: 1px solid coral;
		}

		&--title {
			font-size: $font-size-micro;
			display: flex;
			align-items: center;
		}

		@include input;
		padding: padding();
	}

	&__header,
	&__body {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: padding();
	}

	&__body {
		grid-gap: padding();
	}

	&--item {
		display: flex;
		width: 100%;

		& > div {
			width: 50%;
		}
	}

	&__column {
		display: flex;
		justify-content: space-evenly;

		& > div {
			width: 100%;
		}
	}
}
</style>
