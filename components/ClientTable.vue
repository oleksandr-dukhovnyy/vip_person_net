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

<script>
  export default {
    name: 'ClientTable',
    props: {
      client: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => ({
      showTable: true,
      deposit: 0,
      percent: 0,
      additions: 0,
      tableSize: 30,
    }),
    computed: {
      table() {
        const deposit = Number(this.deposit);
        const additions = Number(this.additions);
        const percent = Number(this.percent);

        const getPercents = (n) => (n / 100) * percent;

        const painPerc = Array(this.tableSize)
          .fill(deposit)
          .map((n, i) => n + getPercents(n) * (i + 1));

        let lastSumm = deposit;
        const complexPerc = [...Array(this.tableSize)].map(
          () => (lastSumm = lastSumm + getPercents(lastSumm))
        );

        // const med = (arr) => {
        //   const arrayHalf = arr.length / 2;
        //   const sorted = [].concat(arr).sort((a, b) => a - b);

        //   return arr.length % 2 === 0
        //     ? (sorted[arrayHalf] + sorted[arrayHalf + 1]) / 2
        //     : sorted[~~arrayHalf];
        // };

        lastSumm = deposit + additions * 11;
        const complexPercWidthAdds = [...Array(this.tableSize)].map(() => {
          // console.group(i);

          // const adds = additions * 12;
          // const percent = getPercents(med(lastSumm, adds + lastSumm));

          // console.log('lastSumm', lastSumm);
          // console.log('adds', adds);
          // console.log('percent', percent);

          const rez = lastSumm + 612;

          // console.groupEnd(i);

          return (lastSumm = rez);
        });

        return [painPerc, complexPerc, complexPercWidthAdds];
      },
    },
    created() {
      this.deposit = 4000; //this.client.table.deposit;
      this.percent = 12; //this.client.table.percent;
      this.additions = 200; //this.client.table.additions;
    },
  };
</script>

<style scoped lang="scss">
  $border: 1px solid $gray-light;

  $column-max-width: 230px;

  .client-table {
    // border: 1px solid black;

    &__input {
      &--contain {
        display: grid;
        grid-template-rows: repeat(3, 40px);
        grid-template-columns: repeat(180px, 150px);
        grid-gap: padding();
        padding: padding();

        // width: 33%;
        width: max-content;

        //outline: 1px solid coral;

        border-radius: $border-radius;
        border: $border;

        margin-bottom: padding(4);
      }

      &--title {
        font-size: $font-size-micro;
        display: flex;
        align-items: center;
      }

      @include input;
      padding: padding();
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
        border-top: $border;
        border-left: $border;
        border-right: $border;
        padding: padding();
        margin-bottom: 0;
        width: 100%;
        max-width: $column-max-width;
        border-radius: $border-radius $border-radius 0 0;

        font-size: 20px;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-direction: column;
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
      border-left: $border;
      border-right: $border;

      &:first-of-type {
        border-right: $border;
        padding-right: 0;
        padding-left: 0;
      }

      & > div {
        // width: 50%;
        font-size: 13px;
      }

      & > div:first-of-type {
        text-align: left;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        line-height: 1;

        width: 44%;

        padding-left: 5px;
      }

      & > div + div {
        text-align: right;
        padding-right: 5px;

        width: 56%;
      }

      &-contain {
        & > div:last-of-type {
          border-radius: 0 0 $border-radius $border-radius;
          border-bottom: $border;
        }
      }

      &--header {
        @include bold();
        text-align: center;

        & > div {
          font-size: 13px !important;
          width: 44% !important;
          justify-content: center !important;
          padding: 0 !important;
        }

        & > div + div {
          padding-right: 0px !important;
          width: 56% !important;
        }
        padding: padding(0.5) padding();
      }
    }

    &__column {
      display: flex;
      justify-content: space-evenly;

      max-width: $column-max-width;
      width: $column-max-width;
      margin: 0 auto;

      & > div {
        width: 100%;
      }
    }
  }
</style>
