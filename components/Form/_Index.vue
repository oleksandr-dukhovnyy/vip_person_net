<template>
  <form>
    <div> title: "{{ title }}" </div>
    <div
      v-for="(field, i) in schema"
      :key="i"
    >
      <component
        :is="fields[supportedTypeAlias[field.type]]"
        :type="field.type"
        @input="inputHandle($event, i)"
      />
    </div>
  </form>
</template>

<script>
  import * as FIELDS from '~/components/Inputs/fields/index.js';
  import { supportedTypes, supportedTypeAlias } from '../Inputs/index.js';

  export default {
    name: 'Form',
    props: {
      title: {
        type: Number,
        required: true,
      },
      schema: {
        type: Array,
        required: true,
        validate: (v) => v.every((f) => supportedTypes.includes(f.type)),
      },
    },
    data: () => ({
      formData: [],
      supportedTypeAlias,
    }),
    computed: {
      fields() {
        return FIELDS;
      },
    },
    created() {
      this.formData = this.schema.map((f) => ({
        type: f.type,
        value: '',
      }));
    },
    methods: {
      submit() {
        this.$emit('submit', this.formData);
      },
      inputHandle(value, index) {
        this.formData[index].value = value;
      },
    },
  };
</script>

<style scoped lang="scss"></style>
