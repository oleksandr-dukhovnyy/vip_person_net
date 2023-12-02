<template>
  <div class="search">
    <img
      src="@/assets/svg/search.svg"
      alt="search"
      class="search__icon"
    />
    <input
      v-model="searchQuery"
      type="text"
      class="search__input"
      placeholder="search..."
    />
  </div>
</template>

<script lang="ts" setup>
  const searchQuery = ref('');
  const lastRequest = ref(0);
  const debounceMinWaitMs = ref(1000);
  const timerId = ref<ReturnType<typeof setTimeout> | undefined>();

  watch(searchQuery, () => {
    const diff = performance.now() - lastRequest.value;

    if (diff >= debounceMinWaitMs.value) {
      makeRequest();
    } else {
      clearTimeout(timerId.value);
      timerId.value = setTimeout(makeRequest, diff);
    }
  });

  function makeRequest() {
    console.log('searchQuery', searchQuery.value);
  }
</script>

<style scoped lang="scss">
  $search-width: 154px;
  $shot-color: #ffb800;
  $search_icon-width: 16px;

  .search {
    width: $search-width;

    display: grid;
    grid-template-columns: $search_icon-width 1fr;
    grid-gap: padding();
    align-items: center;

    height: 34px;
    padding: 0 padding();
    background: #ececec;
    border-radius: $border-radius;

    &__icon {
      width: $search_icon-width;
      margin: auto;
    }

    &__input {
      @include input;
      border: none;
    }

    // &__rezult {
    // 	&--shot {
    // 		color: $shot-color;
    // 	}
    // }
  }
</style>
