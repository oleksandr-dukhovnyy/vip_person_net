<template>
	<div class="clocks">
		<div v-for="n in 5" :key="n" class="clocks__clock"></div>
	</div>
</template>

<script>

export default {
	name: 'Clocks',
	props: {
		clocks: {
			type: Array
		}
	}
}

</script>

<style lang="scss" scoped>
$clocks-count: 5;
$clocks-size: 150px;

.clocks {
	@include container;
	margin-bottom: padding(4);

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: $clocks-size;

	&__clock {
		border: 1px solid black;
		border-radius: 50%;
		width: $clocks-size;
		height: $clocks-size;
	}
}

</style>