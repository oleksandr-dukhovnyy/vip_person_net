<template>
	<div class="client-table">
		<div class="client-table__input--contain">
			<input class="client-table__input" placeholder="123" type="text">
			<input class="client-table__input" type="text">
			<input class="client-table__input" type="text">
		</div>
		<div>
			table
		</div>
	</div>
</template>

<script>

export default {
	name: 'ClientTable'
}

</script>

<style scoped lang="scss">

	.client-table {
		&__input {
			&--contain {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-gap: padding();
				padding: padding();
			}

			@include input;
			padding: padding();
		}
	}

</style>