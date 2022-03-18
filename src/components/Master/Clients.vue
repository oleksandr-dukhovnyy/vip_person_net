<template>
	<div>
		<div v-if="!CLIENTS_LOADING" class="clients">
			<div class="block-info">
				<ClientData
					:client="showClient"
				/>
				<ClientsList
					:clients="CLIENTS"
					:selected="currentClient"

					@choose="changeCurrentClient"
				/>
			</div>
			<Client
				:client="showClient"
			/>
		</div>
		<Loader
			v-else
		/>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Client from './Client.vue';
import ClientData from './ClientData.vue';
import ClientsList from './ClientsList.vue';

const vuexActions = ['LOAD_CLIENTS'];
const vuexGetters = ['CLIENTS', 'CLIENTS_LOADING'];

export default {
	name: 'Clients',
	components: { Client, ClientData, ClientsList },
	data: () => ({
		currentClient: +localStorage.getItem('master-currentClient') || 0
	}),
	watch: {
		currentClient(n){
			localStorage.setItem('master-currentClient', n);
		}
	},
	methods: {
		...mapActions(vuexActions),
		changeCurrentClient(index){
			this.currentClient = index;
		}
	},
	computed: {
		...mapGetters(vuexGetters),
		showClient(){
			if (!this.CLIENTS[this.currentClient]) {
				localStorage.removeItem('master-currentClient');
				return this.CLIENTS[0];
			}

			return this.CLIENTS[this.currentClient];
		}
	},
	created(){
		this.LOAD_CLIENTS();
	}
}

</script>

<style scoped lang="scss">
	.block-info__clients {
		@include container;
	}

	.clients {
		display: grid;
		grid-template-columns: max-content 1fr;

		@include media-down ('t-sm') {
			grid-template-columns: 100%;
			margin: 0 auto;
			width: 100%;
		}

		&__select {
			margin-bottom: 10px;
		}
	}
</style>