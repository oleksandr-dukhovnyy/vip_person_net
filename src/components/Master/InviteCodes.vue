<template>
	<div class="row">
		<div class="table--contain">
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Код</th>
						<th scope="col">Коментарий</th>
						<th scope="col">Создан</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(code, i) in inviteCodes" :key="i">
						<th scope="row">{{ i + 1 }}</th>
						<td>{{ code.code }}</td>
						<td>{{ code.comment }}</td>
						<td>{{ code.created_at | timeFromISO8601 }}</td>
						<td>
							<button
								type="button"
								class="btn-close"
								aria-label="Close"
								title="Удалить код. С этим кодом уже нельзя будет зарегистрироваться!"
								@click="removeCode(i)"
							></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<button type="button" class="btn btn-primary create-bttn" @click="createCode()">
			Сгенерировать пригласительный код
		</button>
	</div>
</template>

<script>
export default {
	name: 'InviteCodes',
	props: {
		inviteCodes: {
			type: Array,
			required: true,
		},
	},
	methods: {
		removeCode(i) {
			this.$emit('removeCode', i);
		},
		createCode() {
			this.$emit('createCode', prompt('Введите комментарий', ''));
		},
	},
};
</script>

<style scoped lang="scss">
	.row {
		max-width: 1000px;
		margin: 0 auto;

		.table--contain {
			@include media-down('m-s'){
				overflow-x: scroll;
			}
		}
	}

	.create-bttn {
		margin: padding() auto 0;
		width: max-content;

		@include scaleble(1.05);
	}
</style>