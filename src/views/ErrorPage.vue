<template>
  <div class="error">
    <div class="error__title">
      <div class="error__title--code">
        {{ code }}
      </div>
      <div class="error__title--title">
        {{ title }}
      </div>
    </div>
    <p class="error__description">
      {{ longDescription }}
    </p>
  </div>
</template>

<script>
const descriptions = {
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
};

export default {
  name: 'ErrorPage',
  props: {
    errorCode: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    code: 404,
  }),
  created() {
    // Если код передан по парамсам роута - то выводить его.
    // Если передан код в пропсах - то его выводить, игнорируя параметр из роута.

    if (this.errorCode === null) {
      this.code = this.$route.params.errorCode || 404;
    } else {
      this.code = this.errorCode;
    }
  },
  computed: {
    description() {
      return descriptions[this.code] !== undefined
        ? descriptions[this.code]
        : {
            title: 'Ошибка',
            long: '',
          };
    },
    title() {
      return this.description.title;
    },
    longDescription() {
      return this.description.description;
    },
  },
};
</script>

<style scoped lang="scss">
.error {
  @include page;
  padding-top: padding(5);

  &__title {
    display: flex;
    width: max-content;
    justify-content: space-between;
    align-items: center;
    margin: auto;

    &--code {
      font-size: $font-size-big;
      margin-right: padding();
      border-right: 1px solid #000;
      padding-right: padding(4);
    }
    &--title {
      margin: 0;
      padding-left: padding(4);
      font-size: $font-size-regular;
    }
  }

  &__description {
    padding-top: padding(3);
    width: 100%;
    text-align: center;
  }
}
</style>
