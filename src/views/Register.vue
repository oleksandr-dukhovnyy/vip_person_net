<template>
	<section class="page">
		<div class="register__form">
			<div>
				<h1 class="register__form-title">
					Регистрация резидентов
				</h1>
			</div>
			<div class="dropdown-divider"></div>
			<div class="register__row">
				<div class="register__title register__title--required">Пригласительный код</div>
				<input
					type="text"
					v-model="code"
					ref="code"
					:class="{
						error: errors.code
					}"
					
					@keydown.enter="$refs.name.focus()"
				/>
			</div>
			<div class="register__row">
				<div class="register__title register__title--required">Имя пользователя</div>
				<input
					type="text"
					v-model="name"
					ref="name"
					:class="{
						error: errors.name
					}"

					@keydown.enter="$refs.email.focus()"
				/>
			</div>
			<div class="register__row">
				<div class="register__title register__title--required">Email</div>
				<input
					type="text"
					v-model="email"
					ref="email"
					:class="{
						error: errors.email
					}"

					@keydown.enter="$refs.phone.focus()"
				/>
			</div>
			<div class="register__row">
				<div class="register__title">Телефон</div>
				<input
					type="text"
					v-model="phone"
					ref="phone"
					:class="{
						error: errors.phone
					}"

					@keydown.enter="$refs.pass1.focus()"
				/>
			</div>
			<div class="register__row">
				<div class="register__title register__title--required">Пароль</div>
				<input
					type="text"
					v-model="pass1"
					ref="pass1"
					:class="{
						error: errors.pass1
					}"

					@keydown.enter="$refs.pass2.focus()"
				/>
			</div>
			<div class="register__row">
				<div class="register__title register__title--required">Пароль повторно</div>
				<input
					type="text"
					v-model="pass2"
					ref="pass2"
					:class="{
						error: errors.pass2
					}"

					@keydown.enter="$refs.code.focus()"
				/>
			</div>
			<div class="dropdown-divider"></div>
			<div class="register__controlls">
				<div
					class="register__controlls-policy"
					:class="{
						error: errors.policy
					}"
				>
					<label>
						<input type="checkbox"
							:checked="inputChecked"
						/>
						<span>
							Даю согласие на обработку своих данных
						</span>
					</label>
				</div>
				<div>
					<button
						class="btn btn-success"
						:disabled="buttnDisabled"
					>
						Зарегистрироваться
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
//import api from '@/utils/API/API';

export default {
	name: 'Register',
	data(){
		return {
			code: '',
			name: '',
			email: '',
			phone: '',
			pass1: '',
			pass2: '',
			buttnDisabled: false,
			inputChecked: false,
			errors: {
				code: false,
				name: false,
				email: false,
				phone: false,
				pass1: false,
				pass2: false,
				policy: false,
			}
		}
	},
	methods: {

	}
}

</script>

<style lang="scss">
.page {
	@include page();

	display: flex;
	justify-content: center;
	align-items: center;

	.register {
		&__form {
			width: 450px;
			padding: padding();
			background-color: #fff;
			border-radius: $border-radius;

			@include shadow;
		
			.dropdown-divider {
				margin: padding() 0;
			}
		}

		&__row {
			padding: padding();
			display: flex;

			input {
				@include input;
				transition: 0.3s;

				@include scaleble(1.04);

				&:focus {
					border: 1px solid #838383;
					transition: 0.3s;

					transform: none
				}
			}
		}

		&__title {
			width: 500px;
			font-size: 14px;
			align-items: center;
    		display: flex;

			&--required::after {
				content: '*';
				padding-left: 2px;
				color: #f00;
			}
		}

		&__form-title {
			font-size: 18px;
			text-align: center;
		}

		&__controlls {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: padding();

			padding: padding() 0 0;

			button {
				width: 100%;
				@include scaleble(1.02);
				cursor: pointer;
			}
		}

		&__controlls-policy {
			font-size: 13px;

			&.error {
				color: $color-error;
			}

			label {
				display: flex;
				align-items: center;
				cursor: pointer;
				
				span {
					padding-left: padding();
				}

				input {
					cursor: pointer;
				}
			}
		}
	}
}

</style>

<style scoped lang="scss">
// .registration {
// 	&__field {
// 		margin: 65px 0;
// 	}

// 	&__form {
// 		@include shadow;
// 		@include container(2);

// 		width: max-content;
// 		min-width: 200px;
// 		height: max-content;

// 		display: grid;
// 		grid-template-columns: 1fr;
// 		grid-template-rows: 50px repeat(2, 24px) 31px;
// 		grid-auto-flow: row;
// 		grid-gap: padding(2);

// 		justify-items: center;
// 		align-items: center;

// 		background-color: #fff;
// 		border-radius: 5px;

// 		&--email,
// 		&--password {
// 			@include input;

// 			font-size: 14px;
// 			padding: 7px;

// 			width: 200px;
// 			height: 24px;

// 			background: #ececec;
// 			border-radius: 7px;
// 		}

// 		&--title {
// 			font-weight: 300;
// 			font-size: 18px;
// 			line-height: 21px;
// 			color: #000;
// 		}

// 		&--submit {
// 			@include button;

// 			width: 100px;
// 			height: 31px;
// 			background-color: $cta-color;
// 		}

// 		&--link {
// 			@include link;
// 		}
// 	}
// }

</style>
