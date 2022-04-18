<template>
	<input
		type="text"
		v-model="value"

		@change="change"
	>
</template>

<script>

export default {
	name: 'Text',
	data(){
		return {
			value: ''
		}
	},
	// watch: {
	// 	value(n) {
	// 		this.$emit('input', n);
	// 	}
	// },
	methods: {
		change(){
			this.$emit('input', this.value);
		}
	}
}

</script>
