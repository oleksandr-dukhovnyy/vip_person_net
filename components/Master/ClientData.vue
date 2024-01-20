<template>
  <div class="client-info--wrapper">
    <div
      v-if="!CLIENTS_LOADING && CLIENT !== null"
      class="client-info"
    >
      <div class="client-info__client">
        {{ clientName }}
      </div>
      <div class="client-info__client client-info__client--last">
        <span>{{ clientEmail }}</span>
      </div>

      <nuxt-link
        class="client-info__show-cabinet"
        :to="`/cabinet?client=${CLIENT?.id}`"
      >
        Посмотреть кабинет клиента
      </nuxt-link>

      <div
        v-if="clientCreatedAt !== null"
        class="client-info__line"
      >
        <p class="client-info__title">
          регист.&nbsp;&nbsp;{{ clientCreatedAtWithoutTime }}
          <span>{{ clientCreatedAtWithoutDate }}</span>
        </p>
      </div>

      <div v-else>
        <p class="client-info__title">регист. -</p>
      </div>
      <!-- <div class="dropdown-divider"></div> -->

      <!-- <div class="dropdown-divider"></div> -->
      <button
        type="button"
        class="btn btn-danger"
        disabled
      >
        Сброс пароля
      </button>
      <button
        type="button"
        class="btn btn-danger"
        disabled
      >
        Удалить страницу
      </button>
    </div>
    <Loader v-else />
  </div>
</template>

<script lang="ts" setup>
  import { DDMMYYYY_ttmm as dateParser } from '~/helpers/timeParser';
  import Loader from '../global/Loader.vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const CLIENTS_LOADING = computed(() => store.getters['CLIENTS_LOADING']);
  const CLIENT = computed(() => store.getters['actions/CURRENT_CLIENT']);
  const clientName = computed(() => CLIENT.value?.name || '-');
  const clientEmail = computed(
    () => store.getters['actions/CURRENT_CLIENT']?.email || '-'
  );
  const clientCreatedAt = computed(
    () => store.getters['actions/CURRENT_CLIENT']?.created_at || null
  );

  const clientCreatedAtWithoutTime = computed(() => {
    if (!clientCreatedAt.value) return '';

    return dateParser(clientCreatedAt.value).replace(/\d{2}:\d{2}/g, '');
  });

  const clientCreatedAtWithoutDate = computed(() => {
    if (!clientCreatedAt.value) return '';

    return dateParser(clientCreatedAt.value).replace(
      /\d{1,2}\.\d{1,2}\.\d{4}/g,
      ''
    );
  });
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
