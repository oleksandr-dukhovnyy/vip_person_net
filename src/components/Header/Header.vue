<template>
	<div class="header__wrapper" :class="{
		'show-full-header': !showFullHeader
	}">
		<header class="header" v-if="showFullHeader">
			<div class="header__group header__group--left">
				<router-link
					:to="{
						name: 'main',
					}"
				>
					<Logo />
				</router-link>
			</div>
			<div class="header__group header__group--right">
				<Search />
				<div class="user">
					<div class="header__dropdown" v-if="!AUTH_LOGIN_LOADING">
						<div class="user__link" v-click-outside="() => (dropdown = false)">
							<div class="user">
								<img
									v-if="USER_AUTHED"
									src="@/assets/svg/user-icon-logged.svg"
									alt="user-icon"
									@click="dropdown = !dropdown"
								/>
								<img
									v-else
									src="@/assets/svg/user-icon.svg"
									alt="user-icon"
									@click="dropdown = !dropdown"
								/>
							</div>
						</div>
						<dir
							class="header__dropdown--container animate__animated"
							v-show="dropdown || dropdownOutAnimationOn"
							:class="{
								animate__fadeIn: dropdown,
								animate__fadeOut: dropdownOutAnimationOn
							}"

							@click.stop="dropdownClick($event)"
							ref="dropdown_container"
						>
							<span>
								{{ USER_NAME }}
							</span>
							<div class="dropdown-divider"></div>
							<router-link
								:to="{ name: 'cabinet' }"
								class="header__dropdown--link"
								v-if="IS_RESIDENT || IS_ADMIN"
							>
								Кабинет
							</router-link>
							<router-link
								:to="{ name: 'master' }"
								class="header__dropdown--link"
								v-if="IS_ADMIN"
							>
								Админка
							</router-link>
							<span class="header__dropdown--link mutted">
								Магазин
							</span>
							<div class="dropdown-divider"></div>
							<button
								type="button"
								class="btn btn-danger header__dropdown--logout"
								v-if="USER_AUTHED"
								@click="LOGOUT"
							>
								Выйти
							</button>
							<!-- <router-link
								:to="{name: 'main'}"
								v-else
								class="c-link mutted"
								disabled="disabled"
							>
								Войти
							</router-link> -->
							<button
								type="button"
								class="btn btn-link c-link header__dropdown--link mutted"
								@click="LOGOUT"
								disabled="disabled"
								v-else
							>
								Войти
							</button>
						</dir>
					</div>
					<Loader class="user__link" v-else />
				</div>
			</div>
		</header>
		<header class="header__hidden__container" v-else>
			<div @click="goBack" class="header__hidden">
				<img src="@/assets/svg/back.svg" alt="back" />
				<p>
					{{ goBackText }}
				</p>
			</div>
		</header>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import Search from './Search.vue';

export default {
	name: 'Header',
	data: () => ({
		dropdown: false,
		dropdownOutAnimationOn: false, // false - hidden, true - animation out
		timeoutID: null
	}),
	components: {
		Search,
	},
	watch: {
		dropdown(n){
			clearTimeout(this.timeoutID);

			if (!n) {
				this.dropdownOutAnimationOn = true;
				this.timeoutID = setTimeout(() => {
					this.dropdownOutAnimationOn = false;
				}, this.config.ui.dropdownWorkSpeedMS);
			}
		}
	},
	computed: {
		showFullHeader() {
			return this.$route.name !== 'cabinet';
		},
		goBackText(){
			return this.$route.params.client
				? 'Вернуться в админку'
				: 'Вернуться на сайт'
		}
	},
	beforeRouteUpdate() {
		this.dropdown = false;
	},
	methods: {
		...mapActions(['LOGOUT']),
		goBack() {
			this.$router.push({
				name: this.$route.params.client ? 'master' : 'main'
			});
		},
		dropdownClick(e) {
			if (e.target !== this.$refs.dropdown_container) {
				this.dropdown = false;
			}
		}
	},
};
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	height: $header-height;
	position: fixed;
	z-index: 1;
	background-color: #fff;

	display: flex;
	justify-content: space-between;

	&__wrapper {
		height: $header-height + padding(2);

		&.show-full-header {
			height: 40px;
		}
	}

	&__hidden {
		&__container {
			height: 40px;
		}

		display: grid;
		grid-template-columns: 12px 1fr;
		align-items: center;
		grid-gap: padding();
		width: max-content;
		cursor: pointer;

		@include container(1);

		img {
			@include scaleble;
		}

		p {
			margin: 0;
			font-size: $font-size-navigation;
		}
	}

	&__group {
		display: flex;
		align-items: center;

		&--right {
			display: grid;
			grid-auto-flow: column;
			grid-gap: padding(2);

			.user {
				display: flex;
				align-items: center;
				cursor: pointer;

				img {
					width: 23px;
				}

				&__link {
					display: flex;
				}
			}
		}
	}

	&__dropdown {
		position: relative;

		&--container {
			position: absolute;
			background-color: #fff;
			padding: padding() padding() (padding() + 2px) padding();
			right: 0px;
			top: 30px;
			min-width: 150px;

			$dbr: 10px;

			border-radius: $dbr 0 $dbr $dbr;

			display: flex;
			flex-direction: column;

			@include shadow;
		}

		&--logout {
			width: 100%;
			border-radius: $border-radius;
		}

		&--link {
			padding: padding() 0;

			@include link;

			&.mutted {
				opacity: 0.6;
			}
		}
	}

	@include shadow();
	@include container(1);
}


.user {
	img {
		@include scaleble;
	}
}
</style>
