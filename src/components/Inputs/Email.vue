<template>
	<div class="email">
		<input type="text"
			v-model="model"

			@blur="validate"
			@input="input"
			@focus="removeError"
		>
		<div v-if="required">
			*
		</div>
		<div v-if="error">
			{{ errorText }}
		</div>
		<div v-else>
			{{ value }}
		</div>
	</div>
</template>

<script>
// required
import fieldMixin from './fieldMixin.js';

export default {
	mixins: [fieldMixin],
	name: 'Email',
	methods: {
		input(){
			this.$emit('emit', 'input', {
				error: this.error,
				value: this.value,
				id: this.id,
				fieldName: this.type
			})
		}
	}
}

</script>

<style scoped></style>