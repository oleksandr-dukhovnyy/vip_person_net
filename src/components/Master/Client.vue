<template>
  <div class="client">
    <div class="client__chart">
      <Chart :actions="client.actions" :raito="0.5625" />
    </div>
    <div class="client__actions">
      <Actions :client="client" />
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart/Chart.vue';
import Actions from './Actions.vue';
import { mapActions, mapGetters } from 'vuex';

const vuexActions = ['CHANGE_CLIENT_DATA'];
const vuexGetters = ['CLIENTS'];

export default {
  name: 'Client',
  components: { Chart, Actions },
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(vuexActions),
  },
  computed: {
    ...mapGetters(vuexGetters),
  },
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
    // max-width: 528px;
    // max-height: 319px;
    width: 100%;
  }
}
</style>
