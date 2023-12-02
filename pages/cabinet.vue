<template>
  <NuxtLayout>
    <section class="cabinet--contain">
      <div
        v-if="!AUTH_LOGIN_LOADING"
        class="cabinet content-data"
      >
        <!-- <div>
        <Navigation />
      </div> -->
        <!-- <div class="clocks">
        <Clocks />
      </div> -->
        <div>
          <ClientData :client="client" />
        </div>
        <div class="cabinet__chart">
          <Chart
            :actions="client.actions"
            :ratio="0.5625"
          />
        </div>
        <div class="cabinet__table">
          <ClientTable :client="client" />
        </div>
      </div>
      <loader v-else />
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import Chart from '~/components/Chart/Chart.vue';
  import ClientTable from '~/components/ClientTable.vue';
  import ClientData from '~/components/Cabinet/ClientData.vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const AUTH_LOGIN_LOADING = computed(
    () => store.getters['AUTH_LOGIN_LOADING']
  );
  const CLIENT_DATA = computed(() => store.getters['CLIENT_DATA']);
  const CLIENT = computed(() => store.getters['CLIENT']);

  const client = computed(() => {
    return CLIENT_DATA.value !== null && CLIENT_DATA.value !== undefined
      ? CLIENT_DATA.value
      : {
          data: {},
          actions: [],
        };
  });
</script>

<style lang="scss" scoped>
  .cabinet {
    @include container(0);
    padding: 70px 0;
    background-color: #fff;
    // border-radius: $border-radius;
    // @include shadow;

    &--contain {
      @include page(0, 0, 40px);
      @include content-container;
      padding: 0;
    }

    &__chart {
      width: 100%;
      margin: auto;
      margin-bottom: padding(4);
    }
  }
</style>
