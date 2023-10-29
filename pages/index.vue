<template>
  <NuxtLayout>
    <section class="main">
      <img
        src="~/assets/svg/star_icon.svg"
        alt="star"
      />
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex';

  const store = useStore();

  console.log(store.getters['client/NAME']);
</script>

<style lang="scss" scoped>
  .main {
    @include page();

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 200px;
      height: 200px;

      @include scaleble(1.4);
    }
  }
</style>
