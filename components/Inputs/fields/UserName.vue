<template>
  <div class="input__contain">
    <div class="input__label">
      {{ label }}
    </div>
    <input
      v-model="value"
      type="text"
      class="input__input"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-if="error">
      {{ errorText }}
    </span>
  </div>
</template>

<script>
  import fieldMixin from '../fieldMixin.js';

  export default {
    name: 'UserName',
    mixins: [fieldMixin],
    data() {
      return {
        type: 'user-name',
      };
    },
  };
</script>

<style scoped lang="scss"></style>
