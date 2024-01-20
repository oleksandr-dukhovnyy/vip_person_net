<template>
  <NuxtLayout>
    <div class="error">
      <div class="error__title">
        <div class="error__title--code">
          {{ errorCode || route.query.code || '404' }}
        </div>
        <div class="error__title--title">
          {{ description.title }}
        </div>
      </div>
      <p class="error__description">
        {{ description.description }}
      </p>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  const descriptions: {
    [key: number | string]: { title: string; description: string };
  } = {
    404: {
      title: 'Страница не найдена',
      description:
        'Данные о странице не найдены. Пожалуйста, проверьте правильность адреса',
    },
    403: {
      title: 'Доступ не разрешен',
      description:
        'У вас недостаточно прав для просмотра этой страницы. Проверьте статус аккаунта',
    },
    default: {
      title: 'Ошибка',
      description: '',
    },
  };

  const props = withDefaults(
    defineProps<{
      errorCode: number | null;
    }>(),
    {
      errorCode: null,
    }
  );

  const route = useRoute();

  const description = computed(() => {
    const code = props.errorCode;

    if (!code || !(code in descriptions)) return descriptions.default;

    return descriptions[code];
  });
</script>

<style scoped lang="scss">
  .error {
    @include page;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: padding(5);

    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: max-content;
      margin: auto;

      &--code {
        margin-right: padding();
        padding-right: padding(4);
        border-right: 1px solid #000;
        font-size: $font-size-big;
      }

      &--title {
        margin: 0;
        padding-left: padding(4);
        font-size: $font-size-regular;
      }
    }

    &__description {
      width: 100%;
      padding-top: padding(3);
      text-align: center;
    }
  }
</style>
