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
    width: max-content;
    &--muted {
      font-style: italic;
      color: #212529;
    }

    max-width: $max-site-content-width;

    display: grid;
    grid-template-columns: 12px 1fr;
    align-items: center;
    grid-gap: padding();
    cursor: pointer;

    @include container(1.75, 3.5);

    img {
      @include scalable;
    }

    p {
      margin: 0;
      font-weight: 400;
      font-size: 15px;
      color: #dc3545;
      opacity: 0.65;
    }
  }
</style>
