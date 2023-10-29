<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
  import useUserStore from './store/user';

  const userStore = useUserStore();

  onMounted(async () => {
    await userStore.AUTO_AUTHENTICATE();
    console.log('userStore.AUTHENTICATED', userStore.AUTHENTICATED);

    if (userStore.AUTHENTICATED) {
      userStore.LOAD_CLIENT_DATA();
    }
  });
</script>
