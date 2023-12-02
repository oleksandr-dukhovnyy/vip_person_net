<template>
  <nav class="pagination--contain">
    <ul class="pagination">
      <li class="page-item">
        <span
          class="page-link"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
      <li
        v-for="(item, i) in range"
        :key="i"
        class="page-item"
      >
        <button
          class="page-link"
          @click="emit('page-selected', item)"
        >
          {{ item }}
        </button>
      </li>

      <li class="page-item">
        <span
          class="page-link"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      perPage: number;
      page: number;
      items: number;
    }>(),
    {
      perPage: 10,
      page: 1,
      items: 0,
    }
  );

  const emit = defineEmits<{
    (e: 'page-selected', page: number): void;
  }>();

  const range = computed(() => {
    const page = props.page;

    return [page - 2, page - 1, page, page + 1, page + 2].filter(
      (item) => item > 0 && item <= props.items
    );
  });
</script>
