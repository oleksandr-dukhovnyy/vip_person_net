<template>
	<section class="login" :class="{ 'vip-login': $route.meta.isVipLogin }">
		<form class="login__form" v-if="!AUTH_LOGIN_LOADING">
			<strong class="login__form--title">
				{{ formTitle }}
			</strong>
			<input
				type="text"
				v-model="email"
				placeholder="email"
				class="login__form--email"
			/>
			<input
				type="text"
				v-model="password"
				placeholder="password"
				class="login__form--password"
			/>
			<button
				@click.prevent="login"
				class="btn btn-success"
				type="button"
				:disabled="AUTH_LOGIN_LOADING"
			>
				Войти
			</button>
			<router-link
				:to="{
					name: $route.meta.isVipLogin ? 'vip-register' : 'register',
				}"

				class="login__form--link"
			>
				Регистрация
			</router-link>
		</form>
		<Loader
			v-else
			:size="50"
		/>
	</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
const vuexActions = ['LOGIN'];
const vuexGetters = ['AUTH_LOGIN_LOADING'];

export default {
	name: 'Login',
	data() {
		return {
			email: 'lebitoh943@ehstock.com',
			password: 'ZSvWEYGtbbszwDHxdQRx',
		};
	},
	created() {
		if(this.CLIENT !== null && this.$route.query.next) {
			this.$router.push({ name: this.$route.query.next });
		} else if (this.CLIENT !== null) {
			this.$router.push({ name: 'cabinet' });
		}
	},
	watch: {
		CLIENT(){
			if(this.CLIENT !== null && this.$route.query.next) {
				this.$router.push({ name: this.$route.query.next });
			} else if (this.CLIENT !== null) {
				this.$router.push({ name: 'cabinet' });
			}
		}
	},
	computed: {
		...mapGetters(vuexGetters),
		formTitle() {
			return this.$route.meta.isVipLogin ? 'Вход для Резидентов' : 'Вход';
		},
	},
	methods: {
		...mapActions(vuexActions),
		login() {
			console.log(this.email, this.password);
			this.LOGIN({
				email: this.email,
				password: this.password,
				next: this.$route.query.next || 'cabinet'
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	@include page;
	display: flex;
	justify-content: center;
	align-items: center;

	&__form {
		@include shadow;
		@include container(2);

		width: max-content;
		min-width: 200px;
		height: max-content;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 50px repeat(2, 24px) 31px;
		grid-auto-flow: row;
		grid-gap: padding(2);

		justify-items: center;
		align-items: center;

		background-color: #fff;
		border-radius: 5px;

		&--email,
		&--password {
			@include input;

			font-size: 14px;
			padding: 7px;

			width: 200px;
			height: 24px;

			background: #ececec;
			border-radius: 7px;
		}

		&--title {
			font-weight: 300;
			font-size: 18px;
			line-height: 21px;
			color: #000;
		}

		&--submit {
			@include button;

			width: 100px;
			height: 31px;
			background-color: $cta-color;
		}

		&--link {
			@include link;
		}
	}
}
</style>
