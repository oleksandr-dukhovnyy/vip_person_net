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
            ref="code"
            v-model="email"
            type="text"
            @keydown.enter="$refs.password.focus()"
          />
        </div>

        <div class="login__row">
          <div class="login__title login__title">Пароль</div>
          <input
            ref="password"
            v-model="password"
            type="password"
            @keydown.enter="$refs.send.focus()"
          />
        </div>

        <!-- <div class="dropdown-divider"></div> -->

        <div class="login__controlls">
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
              class="btn btn-success login__enter"
              :disabled="password === '' || email === ''"
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

<script>
  import { mapActions, mapGetters } from 'vuex';
  const vuexActions = ['LOGIN'];
  const vuexGetters = ['AUTH_LOGIN_LOADING', 'CLIENT'];

  export default {
    name: 'Login',
    data() {
      return {
        // email: 'lebitoh943@ehstock.com',
        // password: 'ZSvWEYGtbbszwDHxdQRx',
        // email: 'script@vip-person.net',
        // password: '123456',
        email: '',
        password: '',
      };
    },
    computed: {
      ...mapGetters(vuexGetters),
      formTitle() {
        return this.$route.meta.isVipLogin ? 'Вход для резидентов' : 'Вход';
      },
    },
    watch: {
      CLIENT() {
        if (
          this.CLIENT !== null &&
          this.CLIENT.id !== undefined &&
          this.$route.query.next
        ) {
          this.$router.push(`/${this.$route.query.next}`);
        } else if (this.CLIENT !== null) {
          this.$router.push('/');
        }
      },
    },
    mounted() {
      if (Object.keys(this.CLIENT).length && this.$route.query.next) {
        return this.$router.push(`/${this.$route.query.next}`);
      } else if (Object.keys(this.CLIENT).length) {
        return this.$router.push('/cabinet');
      }

      if (this.$route.query.email !== undefined) {
        this.email = this.$route.query.email;
      }
    },
    methods: {
      ...mapActions(vuexActions),
      login() {
        this.LOGIN({
          email: this.email,
          password: this.password,
          // next: 'cabinet',
        }).then((logOk) => {
          logOk && this.$router.push('/cabinet');
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
        font-size: 20px;
        text-align: center;
        margin-top: 0;
        margin-bottom: padding(2.5);
      }

      &__form-link {
        @include link;
      }

      &__controlls {
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
          @include scaleble(1.02);
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
