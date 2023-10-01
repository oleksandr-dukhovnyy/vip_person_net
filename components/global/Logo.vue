<template>
  <div class="logo">
    <img
      src="@/assets/images/logo.svg"
      width=""
      height="22"
      alt="logo"
    />
  </div>
</template>

<script>
  export default {
    name: 'Logo',
  };
</script>

<style lang="scss" scoped>
  .logo {
    img {
      height: 22px;
      outline: 1px solid coral;
      @include scaleble(1.1);
    }
  }
</style>
