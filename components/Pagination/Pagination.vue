<template>
	<nav aria-label="Page navigation example" class="pagination--contain">
		<ul class="pagination">
			<li class="page-item">
				<span class="page-link" aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
				</span>
			</li>
			<li
				v-for="(item, i) in range"
				:key="i"

				class="page-item"
			>
				<button
					class="page-link"
					@click="emit('pageSelected', item)"
				>
					{{ item }}
				</button>
			</li>
			
			<li class="page-item">
				<span class="page-link" aria-label="Next">
					<span aria-hidden="true">&raquo;</span>
				</span>
			</li>
		</ul>
	</nav>
</template>

<script>

export default {
	name: 'Pagination',
	props: {
		perPage: {
			type: Number
		},
		page: {
			type: Number
		},
		items: {
			type: Number
		}
	},
	computed: {
		range(){
			return [
				this.page - 2,
				this.page - 1,
				this.page,
				this.page + 1,
				this.page + 2,
			].filter(item => item > 0 && item <= this.items);
		}
	}
}

</script>

<style scoped lang="scss"></style>