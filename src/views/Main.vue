<template>
  <section class="main">
    <img src="@/assets/svg/star_icon.svg" alt="star" />
  </section>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/app.scss';

$size: 200px;

.main {
  @include page();

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: $size;
    height: $size;

    @include scaleble(1.4);
  }
}
</style>
