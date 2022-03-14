<template>
	<section class="cabinet--contain">
		<div v-if="!AUTH_LOGIN_LOADING" class="cabinet">
			<div class="clocks">
				<Clocks />
			</div>
			<div class="cabinet__chart">
				<Chart
					:actions="client.actions"
				/>
			</div>
			<div class="cabinet__table">
				<ClientTable
					:client="client"
				/>
			</div>
		</div>  
		<loader
			v-else
			:size="50"
		/>
	</section>
</template>

<script>
import Clocks from '@/components/Cabinet/Clocks.vue';
import Chart from '@/components/Chart/Chart.vue';
import ClientTable from '@/components/ClientTable.vue';

export default {
	name: 'Cabinet',
	components: { Chart, Clocks, ClientTable },
	computed: {
		client(){
			return this.$route.params.client !== undefined
				? this.$route.params.client
				: this.CLIENT_DATA;
		}
	}
}

</script>

<style lang="scss" scoped>

.cabinet {
	@include container();
	background-color: #fff;

	&--contain {
		@include page(0, 0, 40px);

		display: grid;
	}

	&__chart {
		width: 50%;
		margin: auto;
	}
}

</style>