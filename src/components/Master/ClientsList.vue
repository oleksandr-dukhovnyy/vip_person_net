<template>
	<div class="clients-list">
		<div v-for="(client, index) in clients" :key="index"
			class="clients-list__client"
			:class="{
				'clients-list__client--selected': index === selected
			}"

			@click="$emit('choose', index)"
		>
			{{ client.data.name | text }}
			<span
				class="c-small"
				v-if="client.data.name.length < 8 && client.data.email.length < 25"
			>
				({{ client.data.email }})
			</span>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ClientsList',
	props: {
		clients: {
			type: Array
		},
		selected: {
			type: Number,
		}
	},
	computed: {
		selectedClient(){
			return this.clients[this.selected];
		},
	}
}

</script>

<style scoped lang="scss">
	.clients-list {
		margin-top: 10px;
		@include container;
		border: 1px solid #c2c2c2;
		border-radius: $border-radius;
		padding-right: 0px;

		&__client {
			cursor: pointer;
			padding: (padding() / 2);
			border: 1px solid #fff;

			&--selected {
				margin-right: -1px;
				$border: 1px solid #c2c2c2;

				border-top: $border;
				border-bottom: $border;
				border-left: $border;

				border-radius: $border-radius 0 0 $border-radius;
			}
		}
	}

</style>