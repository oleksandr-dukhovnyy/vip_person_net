<template>
	<div class="footer__wrapper">
		<footer class="footer" v-if="showFullFooter">
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
	position: absolute;
	bottom: 0;
	background-color: #fff;

	&__wrapper {
		margin-top: padding(2);
		height: $footer-height;
		position: relative;
	}

	@include container;
	@include shadow;

	&__link {
		@include link;
	}
}

</style>