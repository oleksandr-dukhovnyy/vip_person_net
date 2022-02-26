<template>
	<div>
		<div v-if="!CLIENTS_LOADING">
			<select v-model="currentClient" class="clients__select">
				<option
					v-for="(client, index) in CLIENTS"
					:key="index"
					:value="index"
				>
					{{ client.data.name || client.data.login }}
				</option>
			</select>
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

const vuexActions = ['LOAD_CLIENTS'];
const vuexGetters = ['CLIENTS', 'CLIENTS_LOADING'];

export default {
	name: 'Clients',
	components: {
		Client
	},
	data: () => ({
		currentClient: localStorage.getItem('master-currentClient') || 0
	}),
	watch: {
		currentClient(n){
			localStorage.setItem('master-currentClient', n);
		}
	},
	methods: mapActions(vuexActions),
	computed: {
		...mapGetters(vuexGetters),
		showClient(){
			return this.CLIENTS[this.currentClient];
		}
	},
	created(){
		this.LOAD_CLIENTS();
	}
}

</script>

<style scoped lang="scss">
	.clients {
		&__select {
			margin-bottom: 10px;
		}
	}
</style>