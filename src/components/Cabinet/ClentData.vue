<template>
  <section class="client-data">
    <div class="client-data__info">
      <strong class="client-data__name">
        {{ name }}
      </strong>
      <div class="client-data__percents">
        <strong class="client-data__month">
          {{ clientPercents.month | number2 }}%
        </strong>
        <strong class="client-data__year">
          {{ clientPercents.year | number2 }}% в год
        </strong>
      </div>
    </div>
  </section>
</template>

<script>
const copy = (obj) => JSON.parse(JSON.stringify(obj));

export default {
  name: 'ClientData',
  props: {
    client: {
      type: Object,
    },
  },
  computed: {
    clientPercents() {
      if (this.client.actions.length === 0) return { year: 0, month: 0 };

      const actions = copy(this.client.actions)[0].data.map((a) => {
        const dateObj = new Date(a.date);

        return {
          ...a,
          dateObj,
          year: dateObj.getFullYear(),
          month: dateObj.getMonth() + 1,
        };
      });

      const maxYear = actions.reduce((acc, curr) => {
        const year = new Date(curr.date).getFullYear();

        return year > acc ? year : acc;
      }, 2000);

      const curentYear = actions
        .filter((a) => a.year === maxYear)
        .sort((a, b) => a.month - b.month);

      const inYear = (curentYear.at(-1)?.value / curentYear.length) * 12;

      return {
        year: inYear,
        month: inYear / 12,
      };
    },
    name() {
      return this.client?.data?.name || 'Клиент';
    },
  },
};
</script>

<style scoped lang="scss">
.client-data {
  // border: 1px solid black;
  @include container;

  &__name {
    font-weight: 300;
    font-size: $font-size-header;
  }

  &__percents {
    width: max-content;
    display: flex;
    column-gap: padding(2);
    align-items: flex-end;
  }

  &__month {
    font-size: $font-size-large;
    font-weight: 200;
    line-height: 1;
  }

  &__year {
    font-size: $font-size-subheader;
    font-weight: 300;
  }
}
</style>
