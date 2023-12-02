<template>
  <div class="logo">
    <img
      src="~/assets/images/logo.svg"
      width=""
      height="22"
      alt="logo"
    />
  </div>
</template>

<style lang="scss" scoped>
  .logo {
    img {
      height: 22px;
      outline: 1px solid coral;
      @include scalable(1.1);
    }
  }
</style>
