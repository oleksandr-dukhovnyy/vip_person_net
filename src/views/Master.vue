<template>
	<section class="master">
		<tabs
			:tabs="tabs"
		>
			<template v-slot:inviteCodes>
				<InviteCodes
					:inviteCodes="INVITE_CODES"

					@removeCode="removeCode"
					@createCode="createCode"
				/>
			</template>

			<template v-slot:clients>
				<Clients />
			</template>
		</tabs>
	</section>
</template>

<script>
import InviteCodes from '@/components/Master/InviteCodes.vue';
import Clients from '@/components/Master/Clients.vue'
import Tabs from '@/components/Master/Tabs';
import { API } from '@/utils/API/API.js';
import { mapActions, mapGetters } from 'vuex';

const vuexActions = ['ADD_GENERATED_INVITE_CODE', 'REMOVE_CODE'];
const vuexGetters = ['INVITE_CODES'];
/*/
needs:
	generate invite codes
	change clients data
	views count
	vip-views count
	client list


/*/
export default {
	name: 'Master',
	data(){
		return {
			tabs: [
				{
					key: 'inviteCodes',
					title: 'Пригласительные коды'
				},
				{
					title: 'Клиенты',
					key: 'clients'
				},
				{
					title: 'Магазин',
					key: 'shop'
				},
				{
					title: 'Тесты',
					key: 'tests'
				},
				{
					title: 'Настройки',
					key: 'settings'
				},
			]
		}
	},
	components: { InviteCodes, Tabs, Clients },
	computed: mapGetters(vuexGetters),
	methods: {
		...mapActions(vuexActions),
		removeCode(i){
			// console.log('removeCode', i, this.INVITE_CODES[i].code);
			this.REMOVE_CODE(this.INVITE_CODES[i].code);
		},
		createCode(comment){
			API
				.generateInviteCode(comment)
				.then(res => {
					this.ADD_GENERATED_INVITE_CODE(res.data[0]);
				})
				.catch(err => {
					console.log('generateInviteCode failed', err);
				});
		}
	}
};
</script>

<style lang="scss">
	.master {
		max-width: 1400px;
		margin: 0 auto;
		@include page;
	}
</style>
