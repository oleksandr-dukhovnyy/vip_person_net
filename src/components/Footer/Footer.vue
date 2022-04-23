<template>
	<div class="footer__wrapper" v-if="showFullFooter">
		<footer class="footer">
			<router-link
				:to="{name: 'vip-login'}"
				class="footer__link"
			>
				Вход для резидентов
			</router-link>
		</footer>
	</div>
</template>

<script>

export default {
	name: 'Footer',
	computed: {
		showFullFooter(){
			return !this.config.dontShowFooter
				.includes(this.$route.name);
		}
	}
}

</script>

<style lang="scss" scoped>

.footer {
	height: $footer-height;
	width: 100%;
	
	max-width: $max-site-content-width;

	&__wrapper {
		margin-top: padding(2);
		background-color: #fff;
		height: $footer-height;
		width: 100%;

		display: flex;
		justify-content: center;
		@include shadow;
	}

	@include container;
	

	&__link {
		@include link;
	}
}

</style>