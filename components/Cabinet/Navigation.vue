<template>
  <div
    class="navigation"
    @click="goBack"
  >
    <img
      src="@/assets/svg/back.svg"
      alt="back"
    />
    <p v-if="$route.params.client">
      <span>Вернуться в админку</span>
    </p>
    <p v-else>
      <!-- <span class="navigation--underline">Вернуться на сайт</span> -->
      <span>Вернуться на главную</span>
      <span class="navigation--muted">
        &nbsp;&nbsp;&nbsp;(выход из кабинета)
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const goBack = async () => {
    await navigateTo('/');
  };
</script>

<style lang="scss" scoped>
  .navigation {
    display: grid;
    grid-template-columns: 12px 1fr;
    grid-gap: padding();
    align-items: center;
    width: max-content;
    max-width: $max-site-content-width;
    cursor: pointer;

    &--muted {
      color: #212529;
      font-style: italic;
    }

    @include container(1.75, 3.5);

    img {
      @include scalable;
    }

    p {
      margin: 0;
      color: #dc3545;
      font-size: 15px;
      font-weight: 400;
      opacity: 0.65;
    }
  }
</style>
