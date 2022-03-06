<template>
	<div class="client">
		<div class="client__chart">
			<Chart
				:client="client"
			/>
		</div>
		<div class="client__actions">
			<Actions
				:client="client"

				@moveAction="moveAction"
			/>
			<div class="dropdown-divider client--divider"></div>
			<ClientTable
				:client="client"
			/>
		</div>
	</div>
</template>

<script>
import Chart from './Chart.vue';
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
		moveAction(index){
			
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

		&__chart {
			height: 250px;
		}
	}
</style>