<template>
  <div
    v-if="!CLIENTS_LOADING"
    class="client"
  >
    <div class="client__chart">
      <Chart
        :actions="ACTIONS"
        :ratio="0.5625"
      />
    </div>
    <div class="client__actions">
      <Actions />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Chart from '~/components/Chart/Chart.vue';
  import Actions from './Actions.vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const CLIENTS_LOADING = computed(() => store.getters['CLIENTS_LOADING']);
  const ACTIONS = computed(
    () => store.getters['actions/CURRENT_CLIENT'].actions
  );
</script>

<style scoped lang="scss">
  .client {
    @include container;

    padding: 0 0 0 padding();

    @include media-down('m') {
      padding: 0;
    }

    &__show-cabinet {
      @include link;
    }

    &__chart {
      width: 100%;
      margin: auto;
    }
  }
</style>
