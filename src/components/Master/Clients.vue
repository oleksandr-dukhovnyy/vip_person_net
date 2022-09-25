<template>
  <div>
    <div v-if="!CLIENTS_LOADING" class="clients">
      <div class="block-info" v-if="showClient">
        <ClientData />
        <ClientsList @choose="changeCurrentClient" />
      </div>
      <Client :clientID="CURRENT_CLIENT_ID" v-if="showClient" />
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Client from './Client.vue';
import ClientData from './ClientData.vue';
import ClientsList from './ClientsList.vue';

const vuexActions = ['LOAD_CLIENTS', 'actions/SET_CURRENT_CLIENT'];
const vuexGetters = [
  'CLIENTS_LOADING',
  'actions/CURRENT_CLIENT_ID',
  'actions/CURRENT_CLIENT',
];

export default {
  name: 'Clients',
  components: { Client, ClientData, ClientsList },
  methods: {
    ...mapActions(vuexActions),
    changeCurrentClient(index) {
      this['actions/SET_CURRENT_CLIENT'](index);
    },
  },
  computed: {
    ...mapGetters(vuexGetters),
    CURRENT_CLIENT_ID() {
      return this['actions/CURRENT_CLIENT_ID'];
    },
    CURRENT_CLIENT() {
      return this['actions/CURRENT_CLIENT'];
    },
    showClient() {
      return !!this.CURRENT_CLIENT;
    },
  },
  created() {
    this.LOAD_CLIENTS();
  },
};
</script>

<style scoped lang="scss">
.block-info__clients {
  @include container;
}

.clients {
  display: grid;
  grid-template-columns: max-content 1fr;

  @include media-down('t-sm') {
    grid-template-columns: 100%;
    margin: 0 auto;
    width: 100%;
  }

  &__select {
    margin-bottom: 10px;
  }
}
</style>
