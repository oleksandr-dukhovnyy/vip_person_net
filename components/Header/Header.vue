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
              v-if="!store.getters.AUTH_LOGIN_LOADING"
              class="header__dropdown"
            >
              <!-- v-click-outside="() => (dropdown = false)" -->
              <div class="user__link">
                <div
                  class="network-status"
                  :title="networkStatus.label"
                  :class="`network-status--${networkStatus.status}`"
                ></div>
                <div class="user">
                  <img
                    v-if="store.getters.USER_AUTHENTICATED"
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
                v-show="
                  (dropdown || dropdownOutAnimationOn) && store.getters.IS_ADMIN
                "
                ref="dropdown_container"
                class="header__dropdown--container animate__animated"
                :class="{
                  animate__fadeIn: dropdown,
                  animate__fadeOut: dropdownOutAnimationOn,
                }"
                @click.stop="dropdownClick($event)"
              >
                <span>
                  {{ store.getters.USER_NAME }}
                </span>
                <div class="dropdown-divider"></div>
                <nuxt-link
                  v-if="store.getters.IS_RESIDENT || store.getters.IS_ADMIN"
                  :to="{ name: 'cabinet' }"
                  class="header__dropdown--link"
                >
                  Кабинет
                </nuxt-link>
                <nuxt-link
                  v-if="store.getters.IS_ADMIN"
                  :to="{ name: 'master' }"
                  class="header__dropdown--link"
                >
                  Админка
                </nuxt-link>
                <span class="header__dropdown--link mutted"> Магазин </span>
                <div class="dropdown-divider"></div>
                <button
                  v-if="store.getters.USER_AUTHENTICATED"
                  type="button"
                  class="btn btn-danger header__dropdown--logout"
                  @click="logout"
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
                  disabled
                  @click="store.getters.LOGOUT"
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
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex';

  const store = useStore();
  const isOnline = ref<boolean | null>(false);

  const dropdown = ref(false);
  const dropdownOutAnimationOn = ref(false);
  const timeoutID = ref<ReturnType<typeof setInterval> | undefined>();
  const dropdown_container = ref<Element | null>(null);

  const networkStatus = computed<{
    status: 'online' | 'offline' | 'unknown';
    label: string;
  }>(() => {
    if (isOnline.value === true) {
      return {
        status: 'online',
        label: 'В сети',
      };
    }

    if (isOnline.value === false) {
      return {
        status: 'offline',
        label: 'Не в сети',
      };
    }

    return {
      status: 'unknown',
      label: 'Ожидание статуса сети...',
    };
  });

  onBeforeRouteUpdate(() => {
    dropdown.value = false;
  });

  watch(dropdown, (v) => {
    clearTimeout(timeoutID.value);

    if (!v) {
      dropdownOutAnimationOn.value = true;
      timeoutID.value = setTimeout(() => {
        dropdownOutAnimationOn.value = false;
      }, 400);
    }
  });

  const dropdownClick = (e: MouseEvent) => {
    if (e.target !== dropdown_container.value) {
      dropdown.value = false;
    }
  };

  const logout = async () => {
    await store.dispatch('LOGOUT');

    navigateTo('/');
  };

  useIsOnline(isOnline);
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
            gap: 14px;

            .network-status {
              margin: auto 0;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #b5b5b5;

              &--online {
                background-color: #2fe519;
              }

              &--offline {
                background-color: #dd4545;
              }

              &--unknown {
                background-color: #b5b5b5;
              }
            }
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
      @include scalable;
    }
  }
</style>
