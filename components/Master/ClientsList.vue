<template>
  <div
    v-if="!CLIENTS_LOADING"
    class="clients-list"
  >
    <div
      v-for="(client, index) in CLIENTS || []"
      :key="index"
      class="clients-list__client"
      :class="{
        'clients-list__client--selected': client.id === CURRENT_CLIENT_ID,
      }"
      @click="$emit('choose', index)"
    >
      {{ client.data.name || '-' }}
      <br />
      <span
        v-if="client.data.name.length < 8 && client.data.email.length < 25"
        class="c-small"
      >
        ({{ client.data.email }})
      </span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  const vuexGetters = ['CLIENTS', 'CLIENTS_LOADING', 'actions/CURRENT_CLIENT'];

  export default {
    name: 'ClientsList',
    emits: ['choose'],
    computed: {
      ...mapGetters(vuexGetters),
      CURRENT_CLIENT_ID() {
        return this['actions/CURRENT_CLIENT']?.id || -1;
      },
    },
  };
</script>

<style scoped lang="scss">
  .clients-list {
    margin-top: 10px;
    @include container(0.5);

    border: 1px solid #c2c2c2;
    border-radius: $border-radius;
    padding-right: 0px;

    &__client {
      cursor: pointer;
      padding: padding(0.5);
      border: 1px solid #fff;
      font-size: 14px;
      line-height: 1;

      .c-small {
        font-size: 13px;
      }

      &--selected {
        font-weight: 600;
      }
    }
  }
</style>
