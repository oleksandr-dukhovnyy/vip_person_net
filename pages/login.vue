<template>
  <NuxtLayout>
    <section
      class="page"
      :class="{ 'vip-login': $route.meta.isVipLogin || true }"
    >
      <form
        v-if="!AUTH_LOGIN_LOADING"
        class="login__form"
      >
        <div>
          <h1 class="login__form-title">{{ formTitle }}</h1>
        </div>
        <!-- <div class="dropdown-divider"></div> -->

        <div class="login__row">
          <div class="login__title login__title">Email</div>
          <input
            ref="email"
            v-model="email"
            type="text"
            @keydown.enter="password?.focus()"
          />
        </div>

        <div class="login__row">
          <div class="login__title login__title">Пароль</div>
          <input
            ref="password"
            v-model="password"
            type="password"
            @keydown.enter="send?.focus()"
          />
        </div>

        <!-- <div class="dropdown-divider"></div> -->

        <div class="login__controls">
          <div class="login__reg-link">
            <nuxt-link
              :to="{
                name: $route.meta.isVipLogin ? 'vip-register' : 'register',
              }"
              class="login__form-link"
            >
              Регистрация
            </nuxt-link>
          </div>
          <div>
            <button
              v-if="!AUTH_LOGIN_LOADING"
              ref="send"
              class="btn btn-success login__enter"
              :disabled="form.password === '' || form.email === ''"
              @click="login"
            >
              Войти
            </button>
            <Loader v-else />
          </div>
        </div>
      </form>
      <Loader v-else />
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex';

  const store = useStore();
  const route = useRoute();

  const email = ref<HTMLInputElement | null>(null);
  const password = ref<HTMLInputElement | null>(null);
  const send = ref<HTMLButtonElement | null>(null);

  const form = reactive({
    email: '',
    password: '',
  });

  const formTitle = computed(() => {
    return route.meta.isVipLogin ? 'Вход для резидентов' : 'Вход';
  });

  const CLIENT = computed(() => store.getters['CLIENT']);
  const AUTH_LOGIN_LOADING = computed(
    () => store.getters['AUTH_LOGIN_LOADING']
  );

  watch(CLIENT, () => {
    // TODO: refactor candidate
    if (
      CLIENT.value !== null &&
      CLIENT.value.id !== undefined &&
      route.query.next
    ) {
      navigateTo(`/${route.query.next}`);
    } else if (CLIENT.value !== null) {
      navigateTo('/');
    }
  });

  onMounted(() => {
    // TODO: refactor candidate
    if (Object.keys(CLIENT.value).length && route.query.next) {
      return navigateTo(`/${route.query.next}`);
    } else if (Object.keys(CLIENT.value).length) {
      return navigateTo('/cabinet');
    }

    if (route.query.email) {
      form.email = route.query.email;
    }
  });

  function login() {
    store
      .dispatch('LOGIN', {
        email: form.email,
        password: form.password,
      })
      .then((logOk) => {
        logOk && navigateTo('/cabinet');
      });
  }
</script>

<style lang="scss" scoped>
  .page {
    @include page();

    display: flex;
    justify-content: center;
    align-items: center;

    .login {
      &__form {
        width: 450px;
        padding: padding(3.5);
        background-color: #fff;
        border-radius: $border-radius;

        @include shadow;

        @include media-down(m) {
          width: 100%;
        }

        .dropdown-divider {
          margin: padding() 0;
        }
      }

      &__row {
        padding: padding() 0 padding(0.5);
        display: flex;

        @include media-down(m) {
          flex-direction: column;
        }

        input {
          @include input;
          font-size: 13px;
          transition: 0.3s;

          width: 190px;
          height: 40px;

          @include scalable(1.04);

          &:focus {
            border: 1px solid #838383;
            transition: 0.3s;

            transform: none;
          }
        }
      }

      &__title {
        width: 500px;
        font-size: 14px;
        align-items: center;
        display: flex;

        @include media-down(m) {
          width: 100%;
        }

        &--required::after {
          content: '*';
          padding-left: 2px;
          color: #f00;
        }
      }

      &__form-title {
        font-size: 20px;
        text-align: center;
        margin-top: 0;
        margin-bottom: padding(2.5);
      }

      &__form-link {
        @include link;
      }

      &__controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: padding();
        padding: padding(3) 0 0;

        // padding: 0;

        @include media-down(m) {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr;
        }

        // padding: padding() 0 0;

        button {
          // width: 100%;
          @include scalable(1.02);
          cursor: pointer;
        }
      }

      &__reg-link {
        display: flex;
        align-items: center;
      }

      &__enter {
        font-size: 15px;
        width: 190px;
        height: 40px;
      }
    }
  }
</style>
