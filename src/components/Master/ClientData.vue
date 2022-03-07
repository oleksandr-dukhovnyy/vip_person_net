<template>
	<div class="client-info--wrapper">
		<div class="client-info" v-if="!CLIENTS_LOADING">
			<div class="client-info__line">
				<div class="client-info__title">
					Имя
				</div>
				<div class="client-info__value">
					{{ client.data.name | text }}
				</div>
			</div>

			<div class="client-info__line">
				<div class="client-info__title">
					Регист.
				</div>
				<div class="client-info__value">
					{{ client.created_at | timeFromISO8601 }}
				</div>
			</div>

			<div class="client-info__line">
				<div class="client-info__title">
					Почта
				</div>
				<div class="client-info__value">
					{{ client.data.email | text }}
				</div>
			</div>

			<div class="client-info__line">
				<div class="client-info__title">
					Роль
				</div>
				<div class="client-info__value">
					{{ client.roleRu | role }}
				</div>
			</div>
			
			<div class="dropdown-divider"></div>
			<router-link
				class="client-info__show-cabinet"
				:to="{
					name: 'cabinet',
					params: {
						client
					}
				}"
			>
				Посмотреть кабинет клиента
			</router-link>
			<div class="dropdown-divider"></div>
			<button type="button" class="btn btn-danger" disabled>
				Сброс пароля
			</button>
			<button type="button" class="btn btn-danger" disabled>
				Удалить клиента
			</button>
		</div>
		<Loader
			v-else
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '../global/Loader.vue';
const vuexGetters = ['CLIENTS_LOADING'];

export default {
	name: 'ClientData',
	components: {
		Loader
	},
	props: [
		'client'
	],
	computed: {
		...mapGetters(vuexGetters)
	}
}

</script>

<style scoped lang="scss">
	.client-info {
		@include container;
		border: 1px solid #c2c2c2;
		border-radius: $border-radius;

		display: grid;
		grid-template-columns: 1fr;
		grid-row-gap: 10px;

		&__line {
			display: grid;
			grid-gap: 10px;
			grid-template-columns: 60px 140px;
		}

		&__value {
			opacity: 0.5;
			font-size: $font-size-small;
		}

		&__show-cabinet {
			@include link;
		}
	}
</style>