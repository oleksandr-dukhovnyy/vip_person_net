<template>
  <div class="logo">
    <img
      src="~/assets/images/logo.svg"
      width="84"
      height="36"
      alt="logo"
    />
  </div>
</template>

<style lang="scss" scoped>
  .logo {
    img {
      width: 84px;
      height: 36px;

      @include scalable(1.1);
    }
  }
</style>
