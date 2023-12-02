<template>
  <img
    v-if="elem && elem.htmlElem === 'img'"
    :src="src"
    :alt="alt"
  />
  <svg v-else-if="elem && elem.htmlElem === 'svg'">
    <use :href="src"></use>
  </svg>
</template>

<script lang="ts" setup>
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

  const props = withDefaults(
    defineProps<{
      type: 'svg' | 'img';
      name: string;
      alt: string;
    }>(),
    {
      type: 'svg',
      name: '',
      alt: '',
    }
  );

  const elem = computed(() => {
    if (typeDetails[props.type] !== undefined) {
      return typeDetails[props.type];
    } else {
      console.error(`cannot find asset rule for type [${props.type}]`);
      return null;
    }
  });

  const src = computed(() => {
    if (elem.value) {
      return `~/assets/${elem.value.assetsFolder}/${props.name}`;
    }

    return '';
  });
</script>
