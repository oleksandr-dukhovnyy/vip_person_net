<template>
	<div class="client">
		<div class="client__chart">
			<Chart
				:actions="client.actions"
			/>
		</div>
		<div class="client__actions">
			<Actions
				:client="client"
			/>
			<div class="dropdown-divider client--divider"></div>
			<ClientTable
				:client="client"
			/>
		</div>
	</div>
</template>

<script>
import Chart from '@/components/Chart/Chart.vue';
import Actions from './Actions.vue';
import ClientTable from './ClientTable.vue';
import { mapActions, mapGetters } from 'vuex';

const vuexActions = ['CHANGE_CLIENT_DATA'];
const vuexGetters = ['CLIENTS'];

export default {
	name: 'Client',
	components: { Chart, Actions, ClientTable },
	props: {
		client: {
			type: Object,
			required: true
		}
	},
	methods: {
		...mapActions(vuexActions),
		viewClient(client){

		}
	},
	computed: {
		...mapGetters(vuexGetters)
	}
}

</script>

<style scoped lang="scss">
	.client {
		@include container;
		padding: 0 0 0 padding();

		&--divider {
			margin-top: padding(7);
		}

		&__show-cabinet {
			@include link;
		}

		// &__chart {
		// 	height: 500px;
		// }
	}
</style>