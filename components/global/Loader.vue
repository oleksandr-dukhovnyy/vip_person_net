<template>
  <div class="wrapper">
    <div
      class="loader"
      :style="{
        '--loader-size': `${size}px`,
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      size?: number;
    }>(),
    {
      size: 20,
    }
  );
</script>

<style lang="scss" scoped>
  $color: $cta-color;

  .wrapper {
    width: 100%;
    height: 100%;

    min-width: 10px;
    min-height: 10px;

    max-width: 100px;
    max-height: 100px;

    display: flex;
    justify-content: center;
    margin: auto;
  }

  .loader {
    width: var(--loader-size);
    height: var(--loader-size);

    min-width: 10px;
    min-height: 10px;

    max-width: 100px;
    max-height: 100px;

    border: 2px solid $color;
    border-radius: $border-radius;

    animation: loading 1s infinite;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
      border-radius: 50%;
      // transform: scale(1);
    }

    50% {
      border-radius: 5px;
      // transform: scale(0.5);
    }

    100% {
      transform: rotate(-180deg);
      border-radius: 50%;
      // transform: scale(1);
    }
  }
</style>
