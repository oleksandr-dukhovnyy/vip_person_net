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
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 10px;
    max-width: 100px;
    height: 100%;
    min-height: 10px;
    max-height: 100px;
    margin: auto;
  }

  .loader {
    width: var(--loader-size);
    min-width: 10px;
    max-width: 100px;
    height: var(--loader-size);
    min-height: 10px;
    max-height: 100px;
    border: 2px solid $color;
    border-radius: $border-radius;
    animation: loading 1s infinite;
  }

  @keyframes loading {
    0% {
      border-radius: 50%;
      transform: rotate(0deg);
    }

    50% {
      border-radius: 5px;
    }

    100% {
      border-radius: 50%;
      transform: rotate(-180deg);
    }
  }
</style>
