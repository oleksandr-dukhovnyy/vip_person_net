<template>
  <section class="cabinet--contain">
    <div v-if="!AUTH_LOGIN_LOADING" class="cabinet content-data">
      <div class="clocks">
        <Clocks />
      </div>
      <div>
        <ClientData :client="client" />
      </div>
      <div class="cabinet__chart">
        <Chart :actions="client.actions" :raito="4" />
      </div>
      <!-- <div class="cabinet__table">
				<ClientTable
					:client="client"
				/>
			</div> -->
    </div>
    <loader v-else :size="50" />
  </section>
</template>

<script>
import Clocks from '@/components/Cabinet/Clocks.vue';
import Chart from '@/components/Chart/Chart.vue';
import ClientTable from '@/components/ClientTable.vue';
import ClientData from '@/components/Cabinet/ClentData.vue';

export default {
  name: 'Cabinet',
  components: { Chart, Clocks, ClientTable, ClientData },
  computed: {
    client() {
      return this.$route.params.client !== undefined
        ? this.$route.params.client
        : this.CLIENT_DATA !== null
        ? this.CLIENT_DATA
        : {
            data: {},
            actions: [],
          };
    },
  },
};
</script>

<style lang="scss" scoped>
.cabinet {
  @include container();
  background-color: #fff;
  border-radius: $border-radius;
  @include shadow;

  &--contain {
    @include page(0, 0, 40px);
    @include content-container;
  }

  &__chart {
    width: 100%;
    margin: auto;
    margin-bottom: padding(4);
  }
}
</style>
