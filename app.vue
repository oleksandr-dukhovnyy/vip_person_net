<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex';

  onMounted(() => {
    const store = useStore();
    store.dispatch('AUTO_AUTH');
  });
</script>
