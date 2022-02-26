<template>
	<section class="page">
		<!-- <form class="registration__form">
			<div class="input-group">
				<FormField
					v-for="(value, type, i) in fields"
					:key="i"

					:id="i"
					:type="type"
					:required="value"
					@input="input"
				/>
			</div>
			<button @click.prevent="regIt">reg</button>
		</form> -->
		<form class="registration__form">
			<div class="mb-3 registration__field">
				<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
			</div>
			<div class="mb-3 registration__field">
				<input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
			</div>
		</form>
	</section>
</template>

<script>
import api from '@/utils/API/API';
import FormField from '@/components/Inputs/FormField.vue';

const generateValidationsMap = fields => {
	const res = {}

	for(let key in fields){
		res[key] = false;
	}

	return res;
}

const API = new api();

export default {
	name: 'Register',
	components: {
		FormField
	},
	data() {
		return {
			data: {
				'user-name': 'Смит',
				email: 'desaveg122@showbaz.com',
				password: '12345678',
				'invite-code': '12345678',
				phone: '+380632441586',
			},
			fields: {
				// fieldName: required
				'user-name': true,
				'email': true,
				'password': true,
				'invite-code': false,
				'phone': false
			},
			validations: generateValidationsMap(this.fields)
		};
	},
	methods: {
		regIt() {
			const regData = {
				email: this.data.email,
				password: this.data.password,
				role: this.isVipRegister ? 'resident' : 'client',
				name: this.data.username,
				phone: this.data.phone,
				inviteCode: this.data.inviteCode,
			};

			console.log('regit: ', regData);

			const valide = Object.keys(this.validations)
				.every(f => this.validations[f]);

			console.log(valide, this.validations);

			// API.register(regData)
			// 	.then((res) => {
			// 		console.log('reg then', res);
			// 		console.log('client', API.getClient());
			// 	})
			// 	.catch((err) => {
			// 		console.log('reg err', err);
			// 	});
		},
		input({id, fieldName, value, error}){

			validations[fieldName] = error;
			this.data[fieldName] = value;

			console.log(fieldName, value)
		}
	},
	computed: {
		isVipRegister() {
			return this.$route.meta.isVipRegister;
		},
	},
};
</script>

<style lang="scss">
.page {
	@include page();

	display: flex;
	justify-content: center;
	align-items: center;
}

.registration {
	&__field {
		margin: 65px 0;
	}

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
