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

<style lang="scss" scoped>
  .main {
    @include page;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 200px;
      height: 200px;

      @include scalable(1.4);
    }
  }
</style>
