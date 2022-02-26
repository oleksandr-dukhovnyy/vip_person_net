<template>
	<div class="client">
		<router-link
			class="client__show-cabinet"
			:to="{
				name: 'cabinet',
				params: {
					client
				}
			}"
		>
			Посмотреть кабинет клиента
		</router-link>
		<div>
			<div>
				<span>Имя: </span>
				<span>{{ client.data.name || '(пусто)' }}</span>
			</div>
			<div>
				<span>Логин: </span>
				<span>{{ client.data.login || '(пусто)' }}</span>
			</div>
			<div>
				<span>Аккаунт создан: </span>
				<span>{{ client.created_at | time }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const vuexActions = ['CHANGE_CLIENT_DATA'];
const vuexGetters = ['CLIENTS'];

export default {
	name: 'Client',
	props: {
		client: {
			type: Object,
			required: true
		}
	},
	methods: {
		...mapActions(vuexActions)
	},
	computed: {
		...mapGetters(vuexGetters)
	}
}

</script>

<style scoped lang="scss">
	.client {
		&__show-cabinet {
			@include link;
		}
	}
</style>