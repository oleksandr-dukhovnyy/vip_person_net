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

<script>
  export default {
    name: 'SaveUserData',
    vuexActions: ['HAS_UNSAVED_CLIENTS_DATA', 'SAVE_USER_DATA'],
  };
</script>

<style lang="scss" scoped>
  button {
    background-color: $green-btn-color;
    border: 1px solid $green-btn-color;
  }
</style>
