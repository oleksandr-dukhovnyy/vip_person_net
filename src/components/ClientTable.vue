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
					<div class="client-table__item-contain">
						<div class="client-table__item client-table__item--header">
							<div>Период, год</div>
							<div>Баланс</div>
						</div>
						<div v-for="(n, i) in c" :key="i" class="client-table__item">
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
		this.deposit = 4000;  //this.client.table.deposit;
		this.percent = 12;    //this.client.table.percent;
		this.additions = 200; //this.client.table.additions;
	},
	computed: {
		table() {
			const deposit = Number(this.deposit);
			const additions = Number(this.additions);
			const percent = Number(this.percent);

			const getPercents = (n) => n / 100 * percent;

			const painPerc = Array(this.tableSize)
				.fill(deposit)
				.map((n, i) => n + getPercents(n) * (i + 1));

			let lastSumm = deposit;
			const complexPerc = [...Array(this.tableSize)]
				.map(() => lastSumm = lastSumm + getPercents(lastSumm));

			let lastComplexSum = deposit + additions * 11;
			const complexPercWidthAdds = [...Array(this.tableSize)]
				.map(() =>
					lastComplexSum = (lastComplexSum + getPercents(lastComplexSum) + additions * 12)
				);

			return [painPerc, complexPerc, complexPercWidthAdds];
		},
	},
};
</script>

<style scoped lang="scss">
$border: 1px solid $gray-light;

$column-width: 350px;

.client-table {
	// border: 1px solid black;

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
		justify-content: space-evenly;
	}

	&__header {
		justify-items: center;

		h3 {
			border-top: $border;
			border-left: $border;
			border-right: $border;
			padding: padding();
			margin-bottom: 0;
			width: $column-width;
		}
	}

	&__body {
		grid-gap: padding();
		border-radius: $border-radius;
	}

	&__item {
		display: flex;
		width: 100%;
		padding: padding(0.5) padding();

		border-top: $border;
   	 	border-left: $border;
    	border-right: $border;

		&:first-of-type {
			border-right: $border;
		}

		& > div {
			width: 50%;
		}

		&-contain {
			border-bottom: $border;
		}

		&--header {
			@include bold();
		}
	}

	&__column {
		display: flex;
		justify-content: space-evenly;

		width: $column-width;
		margin: 0 auto;

		& > div {
			width: 100%;
		}
	}
}
</style>
