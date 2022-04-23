<template>
	<div id="app">
		<Header />
		<main class="main">
			<router-view class="animate__animated animate__backInLeft" />
		</main>
		<Footer />
		<Terminal />
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import Terminal from '@/components/Terminal/Terminal.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';

const vuexActions = ['AUTO_AUTH'];

export default {
	components: {
		Header,
		Footer,
		Terminal,
	},
	methods: {
		...mapActions(vuexActions),
	},
	created() {
		console.log('------------------');
		this.AUTO_AUTH();

		// this.$notify({
		//   title: 'created',
		//   message: 'This is a success message',
		//   type: 'success'
		// });
	},
};
</script>

<style lang="scss" src="@/assets/scss/app.scss"></style>

<style lang="scss" scoped>
	#app {
		display: grid;
		grid-template-rows: $header-height 1fr $footer-height;
	}
</style>
