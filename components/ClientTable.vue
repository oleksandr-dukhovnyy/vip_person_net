<template>
  <div class="client-table">
    <div class="client-table__input--contain">
      <div class="client-table__input--title">Начальный капитал, $</div>
      <input
        v-model="deposit"
        step="100"
        min="1000"
        type="number"
        class="form-control"
      />
      <div class="client-table__input--title">Доходность инвестиций, %</div>
      <input
        v-model="percent"
        step="1"
        type="number"
        class="form-control"
      />
      <div class="client-table__input--title">
        Сумма ежемесячного пополнения счета, $
      </div>
      <input
        v-model="additions"
        step="100"
        min="100"
        type="number"
        class="form-control"
      />
    </div>
    <div
      v-if="showTable"
      class="client-table__table"
    >
      <div class="client-table__header">
        <h3>Простой процент</h3>
        <h3>Сложный процент</h3>
        <h3>
          Сложный процент <br /><span style="font-size: 16px">
            + пополнения
          </span>
        </h3>
      </div>
      <div class="client-table__body">
        <div
          v-for="(c, i) in table"
          :key="i"
          class="client-table__column"
        >
          <div class="client-table__item-contain">
            <div class="client-table__item client-table__item--header">
              <div>Период <span class="c-blur c-italic">&nbsp;(год)</span></div>
              <div style="text-align: center">
                Капитал <span class="c-blur c-italic">($)</span>
              </div>
            </div>
            <div
              v-for="(n, j) in c"
              :key="j"
              class="client-table__item"
            >
              <div>{{ j < 9 ? '&nbsp;&nbsp;' : '' }}{{ j + 1 }}</div>
              <div>
                {{ n.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    client: Client.Info;
  }>();

  const deposit = ref(props.client.depo);
  const percent = ref(+props.client.percent);
  const additions = ref(props.client.adds);
  const tableSize = ref(30);
  const showTable = ref(true);

  const table = computed(() => {
    const painPercent = Array(tableSize.value)
      .fill(deposit.value)
      .map((n, i) => n + getPercents(n) * (i + 1));

    let lastSum = deposit.value;

    const complexPercent = [...Array(tableSize.value)].map(
      () => (lastSum = lastSum + getPercents(lastSum))
    );

    return [
      painPercent,
      complexPercent,
      complexPercent.map((n) => n + additions.value),
    ];
  });

  function getPercents(n: number): number {
    return (n / 100) * percent.value;
  }
</script>

<style scoped lang="scss">
  $border: 1px solid $gray-light;
  $column-max-width: 230px;

  .client-table {
    // border: 1px solid black;

    &__input {
      @include input;

      padding: padding();

      &--contain {
        display: grid;
        grid-template-rows: repeat(3, 40px);
        grid-template-columns: repeat(180px, 150px);
        grid-gap: padding();

        // width: 33%;
        width: max-content;
        margin-bottom: padding(4);
        padding: padding();
        border: $border;
        border-radius: $border-radius;
      }

      &--title {
        display: flex;
        align-items: center;
        font-size: $font-size-micro;
      }
    }

    &__header,
    &__body {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: padding();
      justify-content: space-between;
    }

    &__header {
      justify-items: center;

      h3 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: $column-max-width;
        margin-bottom: 0;
        padding: padding();
        border-top: $border;
        border-right: $border;
        border-left: $border;
        border-radius: $border-radius $border-radius 0 0;
        font-size: 20px;
        text-align: center;
      }
    }

    &__body {
      grid-gap: padding();
      border-radius: $border-radius;
    }

    &__item {
      display: flex;
      width: 100%;

      // line-height: 1;
      padding: padding(0.125) padding(1.5);
      border-top: $border;
      border-right: $border;
      border-left: $border;

      &--header {
        @include bold;

        padding: padding(0.5) padding();
        text-align: center;

        & > div {
          justify-content: center !important;
          width: 44% !important;
          padding: 0 !important;
          font-size: 13px !important;
        }

        & > div + div {
          width: 56% !important;
          padding-right: 0 !important;
          text-align: right;
        }
      }

      &:first-of-type {
        padding-right: 0;
        padding-left: 0;
        border-right: $border;
      }

      & > div:first-of-type {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 44%;
        padding-left: 5px;
        font-size: 11px;
        line-height: 1;
        text-align: left;
      }

      &-contain {
        & > div:last-of-type {
          border-bottom: $border;
          border-radius: 0 0 $border-radius $border-radius;
        }
      }
    }

    &__column {
      display: flex;
      justify-content: space-evenly;
      width: $column-max-width;
      max-width: $column-max-width;
      margin: 0 auto;
    }
  }
</style>
