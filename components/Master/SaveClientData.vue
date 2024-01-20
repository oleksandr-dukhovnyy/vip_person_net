<template>
  <button
    type="button"
    class="btn btn-success"
    :disabled="!HAS_UNSAVED_CLIENTS_DATA"
    title="Отправить изменения на сервер. Это действие нельзя отменить!"
    @click="SAVE_USER_DATA"
  >
    Сохранить изменения
  </button>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex';

  const store = useStore();

  const HAS_UNSAVED_CLIENTS_DATA = computed(
    () => store.getters['HAS_UNSAVED_CLIENTS_DATA']
  );
  const SAVE_USER_DATA = () => {
    store.dispatch('SAVE_USER_DATA');
  };
</script>

<style lang="scss" scoped>
  button {
    border: 1px solid $green-btn-color;
    background-color: $green-btn-color;
  }
</style>
