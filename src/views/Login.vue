<template>
  <section class="page" :class="{ 'vip-login': $route.meta.isVipLogin }">
    <form class="login__form" v-if="!AUTH_LOGIN_LOADING">
      <div>
        <h1 class="login__form-title">{{ formTitle }}</h1>
      </div>
      <div class="dropdown-divider"></div>

      <div class="login__row">
        <div class="login__title login__title">Email</div>
        <input
          type="text"
          v-model="email"
          ref="code"
          @keydown.enter="$refs.password.focus()"
        />
      </div>

      <div class="login__row">
        <div class="login__title login__title">Пароль</div>
        <input
          type="password"
          v-model="password"
          ref="password"
          @keydown.enter="$refs.send.focus()"
        />
      </div>

      <div class="dropdown-divider"></div>

      <div class="login__controlls">
        <div class="login__reg-link">
          <router-link
            :to="{
              name: $route.meta.isVipLogin ? 'vip-register' : 'register',
            }"
            class="login__form-link"
          >
            Регистрация
          </router-link>
        </div>
        <div>
          <button
            class="btn btn-success"
            :disabled="password === '' || email === ''"
            @click="login"
            v-if="!AUTH_LOGIN_LOADING"
          >
            Войти
          </button>
          <Loader v-else />
        </div>
      </div>
    </form>
    <Loader v-else :size="50" />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
const vuexActions = ['LOGIN'];
const vuexGetters = ['AUTH_LOGIN_LOADING'];

export default {
  name: 'Login',
  data() {
    return {
      email: 'lebitoh943@ehstock.com',
      password: 'ZSvWEYGtbbszwDHxdQRx',
    };
  },
  created() {
    if (this.CLIENT !== null && this.$route.query.next) {
      this.$router.push({ name: this.$route.query.next });
    } else if (this.CLIENT !== null) {
      this.$router.push({ name: 'cabinet' });
    }
  },
  watch: {
    CLIENT() {
      if (this.CLIENT !== null && this.$route.query.next) {
        this.$router.push({ name: this.$route.query.next });
      } else if (this.CLIENT !== null) {
        this.$router.push({ name: 'home' });
      }
    },
  },
  computed: {
    ...mapGetters(vuexGetters),
    formTitle() {
      return this.$route.meta.isVipLogin ? 'Вход для Резидентов' : 'Вход';
    },
  },
  methods: {
    ...mapActions(vuexActions),
    login() {
      console.log(this.email, this.password);
      this.LOGIN({
        email: this.email,
        password: this.password,
        next: this.$route.query.next || 'cabinet',
      });
    },
  },
};
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
      padding: padding();
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
      padding: padding();
      display: flex;

      @include media-down(m) {
        flex-direction: column;
      }

      input {
        @include input;
        transition: 0.3s;

        @include scaleble(1.04);

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
      font-size: 18px;
      text-align: center;
    }

    &__form-link {
      @include link;
    }

    &__controlls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: padding();

      padding: 0 padding();

      @include media-down(m) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
      }

      // padding: padding() 0 0;

      button {
        width: 100%;
        @include scaleble(1.02);
        cursor: pointer;
      }
    }

    &__reg-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
