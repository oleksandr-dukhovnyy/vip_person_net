<template>
  <div class="client-info--wrapper">
    <div class="client-info" v-if="!CLIENTS_LOADING && CLIENT !== null">
      <div class="client-info__client">
        {{ clientName | text }}
      </div>
      <div class="client-info__client client-info__client--last">
        <span>{{ clientEmail | text }}</span>
      </div>

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

      <div class="client-info__line" v-if="clientCreatedAt !== null">
        <p class="client-info__title">
          регист.&nbsp;&nbsp;{{ clientCreatedAt | dateWithoutTime }}
          <span>{{ clientCreatedAt | dateWithoutDate }}</span>
        </p>
      </div>

      <div v-else>
        <p class="client-info__title">регист. -</p>
      </div>
      <!-- <div class="dropdown-divider"></div> -->

      <!-- <div class="dropdown-divider"></div> -->
      <button type="button" class="btn btn-danger" disabled>
        Сброс пароля
      </button>
      <button type="button" class="btn btn-danger" disabled>
        Удалить страницу
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
    clientName() {
      return this.CLIENT?.data?.name || '-';
    },
    clientEmail() {
      return this.CLIENT?.data?.email || '-';
    },
    clientCreatedAt() {
      return this.CLIENT?.created_at || null;
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
    // text-align: center;
    padding: 0 0 padding();

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
    // text-align: center;
    line-height: 1;

    span {
      opacity: 0.5;
      font-size: 13px;
    }

    &--last {
      padding-bottom: 13px;
    }
  }

  &__show-cabinet {
    @include link;

    line-height: 1;
  }

  &__title {
    span {
      opacity: 0.5;
      font-size: 12px;
    }
  }
}
</style>
