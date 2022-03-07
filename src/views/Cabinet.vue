<template>
	<section class="cabinet">
		<div v-if="!AUTH_LOGIN_LOADING">
			{{ client }}
		</div>
		<loader 
			v-else
			:size="50"
		/>
	</section>
</template>

<script>
export default {
	name: 'Cabinet',
	data(){
		return {
			client: this.$route.params.client
				? this.$route.params.client
				: this.CLIENT
		}
	}
}

</script>

<style lang="scss" scoped>

.cabinet {
	@include page(0, 0, 40px);

	display: grid;
}

</style>