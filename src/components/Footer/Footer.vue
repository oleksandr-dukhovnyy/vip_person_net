<template>
	<footer class="footer" v-if="showFullFooter">
		<router-link
			:to="{name: 'vip-login'}"
			class="footer__link"
		>
			Вход для резидентов
		</router-link>
	</footer>
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
	width: 100vw;
	position: absolute;
	bottom: 0;
	background-color: #fff;

	@include container;
	@include shadow;

	&__link {
		@include link;
	}
}

</style>