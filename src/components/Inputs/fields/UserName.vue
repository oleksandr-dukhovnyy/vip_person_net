<template>
	<div class="input__contain">
		<div class="input__label">
			{{ label }}
		</div>
		<input
			type="text"
			class="input__input"
			v-model="value"
			@focus="focused = true"
			@blur="focused = false"
		>
		<span v-if="error">
			{{ errorText }}
		</span>
	</div>
</template>

<script>
import fieldMixin from '../fieldMixin.js';

export default {
	mixins: [fieldMixin],
	data(){
		return {
			type: 'user-name'
		}
	},
	name: 'UserName'
}

</script>

<style scoped lang="scss">


</style>