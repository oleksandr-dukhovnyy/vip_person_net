<template>
  <div>
    <div
      v-if="!CLIENTS_LOADING"
      class="clients"
    >
      <div
        v-if="showClient"
        class="block-info"
      >
        <ClientData />
        <ClientsList @choose="changeCurrentClient" />
      </div>
      <Client
        v-if="showClient"
        :client-id="CURRENT_CLIENT_ID"
      />
    </div>
    <Loader v-else />
  </div>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex';
  import Client from './Client.vue';
  import ClientData from './ClientData.vue';
  import ClientsList from './ClientsList.vue';

  const store = useStore();

  const CLIENTS_LOADING = computed(() => store.getters['CLIENTS_LOADING']);
  const CURRENT_CLIENT_ID = computed(
    () => store.getters['actions/CURRENT_CLIENT_ID']
  );
  const CURRENT_CLIENT = computed(
    () => store.getters['actions/CURRENT_CLIENT']
  );
  const showClient = computed(() => !!CURRENT_CLIENT.value);
  const CLIENTS = computed(() => store.getters['CLIENTS']);

  if (!CLIENTS.value?.length) store.dispatch('LOAD_CLIENTS');

  function changeCurrentClient(index: number) {
    store.dispatch('actions/SET_CURRENT_CLIENT', index);
  }
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
      width: 100%;
      margin: 0 auto;
    }

    &__select {
      margin-bottom: 10px;
    }
  }
</style>
