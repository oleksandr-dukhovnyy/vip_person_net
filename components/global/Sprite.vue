<template>
  <img
    v-if="elem.htmlElem === 'img'"
    :src="src"
    :alt="alt"
  />
  <svg v-else-if="elem.htmlElem === 'svg'">
    <use :href="src"></use>
  </svg>
</template>

<script>
  const typeDetails = {
    svg: {
      assetsFolder: 'svg',
      htmlElem: 'svg',
    },
    img: {
      assetsFolder: 'images',
      htmlElem: 'img',
    },
  };

  export default {
    name: 'Sprite',
    props: {
      type: {
        type: String,
        default: 'svg',
        require: false,
      },
      name: {
        type: String,
        require: true,
        default: '',
      },
      alt: {
        type: String,
        require: false,
        default: '',
      },
    },
    computed: {
      elem() {
        if (typeDetails[this.type] !== undefined) {
          return typeDetails[this.type];
        } else {
          console.error(`cannot find asset rule for type [${this.type}]`);
          return null;
        }
      },
      src() {
        if (this.elem) {
          return `@/assets/${this.elem.assetsFolder}/${this.name}`;
        }

        return '';
      },
    },
  };
</script>
