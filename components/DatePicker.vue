<template>
  <div
    v-click-outside="() => (opened = false)"
    class="picker"
  >
    <input
      v-model="model"
      type="text"
      @click="opened = true"
      @focus="opened = true"
    />
    <div
      v-if="opened"
      class="picker__calendar animate__animated animate__fadeIn"
    >
      <DatePicker
        v-model="model"
        mode="date"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { DatePicker } from 'v-calendar';
  import 'v-calendar/style.css';

  const props = defineProps<{
    placeholder: string;
    modelValue: string | Date;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | Date): void;
  }>();

  const opened = ref(false);

  const model = computed({
    get() {
      return props.modelValue;
    },
    set(n) {
      emit('update:modelValue', n);
    },
  });
</script>

<style lang="scss" scoped>
  .picker {
    position: relative;
    display: flex;
    flex-direction: column;

    input {
      @include input;
    }

    &__calendar {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      border-radius: 0.5rem;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 25%);
      transform: translate(-50%, 22px);
    }
  }
</style>
