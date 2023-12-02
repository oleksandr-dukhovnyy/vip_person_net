<template>
  <div>
    <div class="tabs__top">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tabs__top--item"
        :class="{
          'tabs__top--active': activeTab === tab.key,
        }"
        @click="activeTab = tab.key"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="tabs__bottom">
      <div
        v-if="!!$slots[activeTab]"
        class="tabs__bottom--item"
      >
        <slot :name="activeTab" />
      </div>
      <div
        v-if="!$slots[activeTab]"
        class="tabs__bottom--item"
      >
        Раздел пока в разработке
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    tabs: {
      title: string;
      key: string;
    }[];
  }>();

  const activeTab = ref(localStorage.getItem('tabs-activeTab') || '');

  watch(activeTab, () => {
    localStorage.setItem('tabs-activeTab', activeTab.value);
  });
</script>

<style lang="scss" scoped>
  $tabs-top-height: 40px;

  .tabs {
    &__top {
      display: grid;
      // grid-auto-flow: column;
      grid-template-columns: repeat(5, 190px);
      justify-content: center;
      grid-template-rows: $tabs-top-height;
      align-items: center;

      grid-column-gap: padding(0.5);
      padding: 0 padding();

      border-bottom: 1px solid #fff;

      @include media-down('m-s') {
        overflow-x: scroll;
      }

      &--item {
        width: 100%;
        height: $tabs-top-height;

        padding: padding();
        font-size: 12px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: $border-radius $border-radius 0 0;

        $border: 1px solid $cta-color;
        border-top: $border;
        border-left: $border;
        border-right: $border;
        font-weight: 600;

        // letter-spacing: 2px;
        transition: 0.3s;
        cursor: pointer;
      }

      &--active {
        background-color: $cta-color;
        // color: #fff;

        transition: 0.3s;
      }
    }

    &__bottom {
      border-radius: $border-radius;
      background-color: #fff;
      @include shadow;

      @include container(1);

      @include media-down('m') {
        border-radius: $border-radius $border-radius 0 0;
      }

      &--item {
        @include container(1);

        @include media-down('m') {
          padding: 0;
        }
      }
    }
  }
</style>
