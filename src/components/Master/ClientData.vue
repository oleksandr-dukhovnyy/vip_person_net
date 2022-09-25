<template>
  <div class="client-info--wrapper">
    <div class="client-info" v-if="!CLIENTS_LOADING">
      <div class="client-info__client">
        {{ CLIENT.data.name | text }} &nbsp;<span
          >({{ CLIENT.data.email | text }})</span
        >
      </div>

      <div class="client-info__line">
        <p class="client-info__title">
          регист.&nbsp;&nbsp;{{ CLIENT.created_at | timeFromISO8601 }}
        </p>
      </div>
      <!-- <div class="dropdown-divider"></div> -->
      <router-link
        class="client-info__show-cabinet"
        :to="{
          name: 'cabinet',
          params: {
            CLIENT,
          },
        }"
      >
        Посмотреть кабинет клиента
      </router-link>
      <!-- <div class="dropdown-divider"></div> -->
      <button type="button" class="btn btn-danger" disabled>
        Сброс пароля
      </button>
      <button type="button" class="btn btn-danger" disabled>
        Удалить клиента
      </button>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '../global/Loader.vue';
const vuexGetters = ['CLIENTS_LOADING', 'actions/CURRENT_CLIENT'];

export default {
  name: 'ClientData',
  components: {
    Loader,
  },
  computed: {
    ...mapGetters(vuexGetters),
    CLIENT() {
      return this['actions/CURRENT_CLIENT'];
    },
  },
};
</script>

<style scoped lang="scss">
.client-info {
  @include container(1);
  border: 1px solid #c2c2c2;
  border-radius: $border-radius;

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
  margin: 0 auto;

  button {
    width: 190px;
    height: 40px;
    margin: 0 auto padding(0.5);

    font-size: 15px;
  }

  button:first-of-type {
    margin: 0 auto;
  }

  &--wrapper {
    max-width: 250px;
    margin: 0 auto;
  }

  &__line {
    // display: grid;
    // grid-gap: 10px;
    // grid-template-columns: 85px 1fr;
    font-size: 13px;
    text-align: center;

    p {
      margin: 0;
      line-height: 1;
    }
  }

  // &__value {
  // opacity: 0.5;
  // font-size: 14px;
  // }

  &__client {
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    line-height: 1;

    span {
      opacity: 0.5;
      font-size: 13px;
    }
  }

  &__show-cabinet {
    @include link;
    padding: 0 0 padding(2);
    line-height: 1;
  }

  // &__title {
  //   // font-size: 14px;
  // }
}
</style>
