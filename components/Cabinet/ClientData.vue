<template>
  <section class="client-data">
    <div class="client-data__info">
      <strong class="client-data__name">
        {{ name }}
      </strong>
      <div class="client-data__percents">
        <strong class="client-data__month">
          {{ clientPercents.month.toFixed(2) }}%
        </strong>
        <strong class="client-data__year">
          {{ clientPercents.year.toFixed(3) }}% в год
        </strong>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    client: Client.Info;
  }>();

  const name = computed(() => props.client?.data?.name || 'Клиент');

  const clientPercents = computed(() => {
    if (
      !props.client ||
      !props.client.actions ||
      props.client.actions.length === 0
    ) {
      return { year: 0, month: 0 };
    }

    const actions = props.client.actions[0].data.map((a) => {
      const dateObj = new Date(a.date);

      return {
        ...a,
        dateObj,
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1,
      };
    });

    const maxYear = actions.reduce((acc: number, curr) => {
      const year = new Date(curr.date).getFullYear();
      return year > acc ? year : acc;
    }, 2000);

    const currentYear = actions
      .filter((a) => a.year === maxYear)
      .sort((a, b) => a.month - b.month);

    const inYear =
      (+currentYear[currentYear.length - 1]?.value / currentYear.length) * 12;

    return {
      year: inYear,
      month: inYear / 12,
    };
  });
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
