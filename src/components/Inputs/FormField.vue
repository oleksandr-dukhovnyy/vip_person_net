<template>
	<component
		v-if="component !== null"

		:is="component"
		
		:inputType="type"
		:required="required"

		@emit="emit"
	></component>
</template>

<script>
import {
	Modules as fields,
	supportedTypes,
	supportedTypeAlias
} from './index.js';

export default {
	name: 'FormField',
	props: {
		type: {
			type: String,
			default: 'text',
			validator: (v) => supportedTypes.includes(v),
			required: true
		},
		required: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			component: fields[supportedTypeAlias[this.type]],
		}
	},
	methods: {
		emit(...p){
			this.$emit(...p);
		}
	}
}

</script>

<style scoped></style>