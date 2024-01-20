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
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: $max-site-content-width;
    height: $footer-height;
    line-height: 1;

    &__copyright {
      font-size: 12px;
      opacity: 0.5;
    }

    &__wrapper {
      position: fixed;
      bottom: 0;
      display: flex;
      justify-content: center;
      width: 100%;
      height: $footer-height;
      background-color: #fff;

      @include shadow;
    }

    @include container(1, 3.5);

    &__link {
      @include link;

      left: padding(3.5);
      cursor: pointer;
    }
  }
</style>
