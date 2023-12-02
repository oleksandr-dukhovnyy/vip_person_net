<template>
  <div class="tabs">
    <div class="tabs__top">
      <div
        v-for="item in list"
        :key="item.key"
        class="tabs__top-item"
        :class="{
          'tabs__top-item--active': modelValue == item.key,
        }"
        @click="emit('update:model-value', item.key)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="tabs__body">
      <slot :data="selectedElem" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    list: {
      title: string;
      key: string;
      data: any;
    }[];
    modelValue: string | number;
  }>();

  const emit = defineEmits<{
    (e: 'update:model-value', value: string | number): void;
  }>();

  const selectedElem = computed(() =>
    props.list.find((item) => item.key == props.modelValue)
  );
</script>

<style lang="scss" scoped>
  .tabs {
    display: flex;
    flex-direction: column;

    &__top {
      display: flex;
      gap: 2px;

      &-item {
        padding: 8px 16px;
        background-color: #f7f7f7;
        opacity: 0.6;
        border-radius: 5px 5px 0 0;
        cursor: pointer;
        border: 1px solid #ccc;
        border-bottom: none;
        transition: opacity 300ms;

        &--active {
          position: relative;
          bottom: -1px;
          padding-top: 7px;
          background-color: #f7f7f7;
          opacity: 1;
        }
      }
    }

    &__body {
      background-color: #f7f7f7;
      border: 1px solid #ccc;
      border-radius: 0 5px 5px 5px;
    }
  }
</style>
