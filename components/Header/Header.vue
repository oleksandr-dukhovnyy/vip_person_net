<template>
  <div>
    <div class="header__wrapper">
      <div class="space"></div>
      <header class="header">
        <div class="header__group header__group--left">
          <nuxt-link to="/">
            <Logo />
          </nuxt-link>
        </div>
        <div class="header__group header__group--right">
          <!-- <Search /> -->
          <div class="user">
            <div
              v-if="!AUTH_LOGIN_LOADING"
              class="header__dropdown"
            >
              <!-- v-click-outside="() => (dropdown = false)" -->
              <div class="user__link">
                <div class="user">
                  <img
                    v-if="USER_AUTHED"
                    src="@/assets/svg/user-icon-logged.svg"
                    alt="user-icon"
                    @click="dropdown = !dropdown"
                  />
                  <img
                    v-else
                    src="@/assets/svg/user-icon.svg"
                    alt="user-icon"
                    @click="dropdown = !dropdown"
                  />
                </div>
              </div>
              <div
                v-show="(dropdown || dropdownOutAnimationOn) && IS_ADMIN"
                ref="dropdown_container"
                class="header__dropdown--container animate__animated"
                :class="{
                  animate__fadeIn: dropdown,
                  animate__fadeOut: dropdownOutAnimationOn,
                }"
                @click.stop="dropdownClick($event)"
              >
                <span>
                  {{ USER_NAME }}
                </span>
                <div class="dropdown-divider"></div>
                <nuxt-link
                  v-if="IS_RESIDENT || IS_ADMIN"
                  :to="{ name: 'cabinet' }"
                  class="header__dropdown--link"
                >
                  Кабинет
                </nuxt-link>
                <nuxt-link
                  v-if="IS_ADMIN"
                  :to="{ name: 'master' }"
                  class="header__dropdown--link"
                >
                  Админка
                </nuxt-link>
                <span class="header__dropdown--link mutted"> Магазин </span>
                <div class="dropdown-divider"></div>
                <button
                  v-if="USER_AUTHED"
                  type="button"
                  class="btn btn-danger header__dropdown--logout"
                  @click="LOGOUT"
                >
                  Выйти
                </button>
                <!-- <nuxt-link
									:to="{name: 'main'}"
									v-else
									class="c-link mutted"
									disabled="disabled"
								>
									Войти
								</nuxt-link> -->
                <button
                  v-else
                  type="button"
                  class="btn btn-link c-link header__dropdown--link mutted"
                  disabled="disabled"
                  @click="LOGOUT"
                >
                  Войти
                </button>
              </div>
            </div>
            <Loader
              v-else
              class="user__link"
            />
          </div>
        </div>
      </header>
      <!-- <header class="header__hidden__container" v-else>
        <div @click="goBack" class="header__hidden">
          <img src="@/assets/svg/back.svg" alt="back" />
          <p v-if="$route.params.client">Вернуться в админку</p>
          <p v-else>
            <span class="header__hidden--underline">Вернуться на сайт</span>
            <span class="header__hidden--muted"
              >&nbsp;&nbsp;&nbsp;(выход из кабинета)</span
            >
          </p>
        </div>
      </header> -->
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  // import Search from './Search.vue';

  export default {
    name: 'TheHeader',
    components: {
      // Search,
    },
    beforeRouteUpdate() {
      this.dropdown = false;
    },
    data: () => ({
      dropdown: false,
      dropdownOutAnimationOn: false, // false - hidden, true - animation out
      timeoutID: null,
    }),
    computed: {
      ...mapGetters([
        'AUTH_LOGIN_LOADING',
        'USER_AUTHED',
        'USER_NAME',
        'IS_RESIDENT',
        'IS_ADMIN',
      ]),
      showFullHeader() {
        return this.$route.name !== 'cabinet';
      },
      // goBackText() {
      //   return this.$route.params.client
      //     ? 'Вернуться в админку'
      //     : 'Вернуться на сайт';
      // },
    },
    watch: {
      dropdown(n) {
        clearTimeout(this.timeoutID);

        if (!n) {
          this.dropdownOutAnimationOn = true;
          this.timeoutID = setTimeout(() => {
            this.dropdownOutAnimationOn = false;
          }, 400);
        }
      },
    },
    methods: {
      ...mapActions(['LOGOUT']),
      dropdownClick(e) {
        if (e.target !== this.$refs.dropdown_container) {
          this.dropdown = false;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: $header-height;
    position: fixed;

    display: flex;
    justify-content: space-between;
    max-width: $max-site-content-width;

    @include container(1, 2.4);
    @include media-down('m') {
      @include container(1, 0);
    }

    &__wrapper {
      height: $header-height;
      background-color: #fff;
      width: 100%;
      margin-bottom: padding(2);
      display: flex;
      justify-content: center;
      z-index: 2;

      position: fixed;

      .space {
        height: $header-height;
        width: 1px;
      }

      @include shadow();

      &.show-full-header {
        background-color: transparent;
        height: 40px;
        box-shadow: none;
        display: flex;
        justify-content: center;
        width: 100%;

        .header__hidden__container {
          width: 100%;
          max-width: $max-site-content-width;
          display: flex;
          justify-content: flex-start;
        }

        .space {
          height: 40px;
        }
      }
    }

    &__group {
      display: flex;
      align-items: center;

      &--right {
        display: grid;
        grid-auto-flow: column;
        grid-gap: padding(2);

        .user {
          display: flex;
          align-items: center;
          cursor: pointer;

          img {
            $size: 20px;
            width: $size;
            height: $size;
          }

          &__link {
            display: flex;
          }
        }
      }
    }

    &__dropdown {
      position: relative;

      &--container {
        position: absolute;
        background-color: #fff;
        padding: padding() padding() (padding() + 2px) padding();
        right: 0px;
        top: 30px;
        min-width: 150px;

        $dbr: 10px;

        border-radius: $dbr 0 $dbr $dbr;

        display: flex;
        flex-direction: column;

        @include shadow;
      }

      &--logout {
        width: 100%;
        border-radius: $border-radius;
      }

      &--link {
        padding: padding() 0;

        @include link;

        &.mutted {
          opacity: 0.6;
        }
      }
    }
  }

  .user {
    img {
      @include scaleble;
    }
  }
</style>
