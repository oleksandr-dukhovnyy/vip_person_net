<template>
  <div
    v-if="showFullFooter"
    class="footer__wrapper"
  >
    <footer class="footer">
      <nuxt-link
        v-if="!USER_AUTHENTICATED"
        to="/vip-login"
        class="footer__link"
      >
        для резидентов
      </nuxt-link>
      <nuxt-link
        v-else
        to="/"
        class="footer__link c-red"
        @click="LOGOUT"
      >
        выход
      </nuxt-link>
      <span class="footer__copyright"> SCRIPT developers studio © </span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex';

  const store = useStore();
  const route = useRoute();

  const USER_AUTHENTICATED = computed(
    () => store.getters['USER_AUTHENTICATED']
  );
  const showFullFooter = computed(
    () => !['cabinet', 'master'].includes(route.name)
  );

  const LOGOUT = () => {
    store.dispatch('LOGOUT');
  };
</script>

<style lang="scss" scoped>
  .footer {
    position: fixed;
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
      cursor: pointer;
    }
  }
</style>
