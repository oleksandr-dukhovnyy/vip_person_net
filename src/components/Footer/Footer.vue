<template>
  <div class="footer__wrapper" v-if="showFullFooter">
    <footer class="footer">
      <router-link :to="{ name: 'vip-login' }" class="footer__link">
        Вход для резидентов
      </router-link>
      <span class="footer__copyright"> SCRIPT developers studio © </span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    showFullFooter() {
      return !this.config.dontShowFooter.includes(this.$route.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  // position: relative;
  height: $footer-height;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;

  max-width: $max-site-content-width;

  &__copyright {
    font-size: 12px;

    opacity: 0.5;
  }

  &__wrapper {
    // margin-top: padding(2);
    background-color: #fff;
    height: $footer-height;
    width: 100%;
    bottom: 0;
    position: fixed;

    display: flex;
    justify-content: center;
    @include shadow;
  }

  @include container(1, 3.5);

  &__link {
    @include link;
    // position: absolute;
    left: padding(3.5);
    // line-height: 10px;
  }
}
</style>
