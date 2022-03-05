<template>
	<div class="search">
		<img
			src="@/assets/svg/search.svg"
			alt="search"
			class="search__icon"
		>
		<input
			type="text"
			class="search__input"
			placeholder="search..."
		>
		<!-- <div class="search__rezults">
			<div class="search__rezult">
				<a href="#">
					Scri<span class="search__rezult--shot">pt</span> dev studio
				</a>
			</div>
		</div> -->
	</div>
</template>

<script>

export default {
	name: 'Search',
	data(){
		return {
			searchQuery: '',
			searchRezults: [],
			lastRequest: 0,
			debounceMinWaitMs: 1000,
			timerId: null
		}
	},
	watch: {
		searchQuery(){
			const diff = performance.now() - this.lastRequest;

			if (diff >= this.debounceMinWaitMs) {
				this.makeRequest();
			} else {
				clearTimeout(this.timerId);
				this.timerId = setTimeout(this.makeRequest, diff);
			}
		},
		makeRequest(){
			// this.lastRequest = performance.now();
			// API.search(this.searchQuery).then(r => { this.searchRezults = res.data.rezults })
		}
	}
}

</script>

<style scoped lang="scss">

$search-width: 154px;
$padding: 9px;
$shot-color: #ffb800;
$search_icon-width: 16px;

.search {
	width: $search-width;

	display: grid;
	grid-template-columns: $search_icon-width 1fr;
	grid-gap: 9px;
	align-items: center;

	height: 34px;
	padding: 7px;
	background: #ECECEC;
	border-radius: 7px;

	&__icon {
		width: $search_icon-width;
		margin: auto;
	}
	
	&__input {
		@include input;
	}
	
	// &__rezult {
	// 	&--shot {
	// 		color: $shot-color;
	// 	}
	// }
}

</style>