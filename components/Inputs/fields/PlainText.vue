<template>
  <input
    v-model="value"
    type="text"
    @change="change"
  />
</template>

<script>
  export default {
    name: 'TheText',
    emits: ['input'],
    data() {
      return {
        value: '',
      };
    },
    // watch: {
    // 	value(n) {
    // 		this.$emit('input', n);
    // 	}
    // },
    methods: {
      change() {
        this.$emit('input', this.value);
      },
    },
  };
</script>
