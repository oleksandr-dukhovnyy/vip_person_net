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
        'clients-list__client--selected': client.id == CURRENT_CLIENT_ID,
      }"
      @click="emit('choose', index)"
    >
      {{ client.name || '-' }}
      <br />
      <span class="c-small"> ({{ client.email }}) </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex';

  const emit = defineEmits<{
    (e: 'choose', index: number): void;
  }>();

  const store = useStore();

  const CLIENTS = computed(() => store.getters['CLIENTS']);
  const CLIENTS_LOADING = computed(() => store.getters['CLIENTS_LOADING']);
  const CURRENT_CLIENT_ID = computed(
    () => store.getters['actions/CURRENT_CLIENT']?.id
  );
</script>

<style scoped lang="scss">
  .clients-list {
    margin-top: 10px;
    @include container(0.5);
    width: 230px;

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
