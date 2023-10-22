<template>
  <div
    v-if="!CLIENTS_LOADING"
    class="client"
  >
    <div class="client__chart">
      <Chart
        :actions="this['actions/CURRENT_CLIENT'].actions"
        :ratio="0.5625"
      />
    </div>
    <div class="client__actions">
      <Actions />
    </div>
  </div>
</template>

<script>
  import Chart from '~/components/Chart/Chart.vue';
  import Actions from './Actions.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Client',
    components: { Chart, Actions },
    computed: mapGetters([
      'CLIENTS',
      'CLIENTS_LOADING',
      'actions/CURRENT_CLIENT',
    ]),
  };
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
      margin: auto;
      width: 100%;
    }
  }
</style>
