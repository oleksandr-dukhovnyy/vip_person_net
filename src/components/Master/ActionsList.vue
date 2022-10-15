<template>
  <div>
    <div class="actions__table--contain">
      <div
        class="actions__table actions__table--header"
        :class="{
          'closed-editor': editorOn,
        }"
      >
        <div
          title="Порядковый номер экшена. Чем больше - тем старше. Экшн №1, например, произошел ПОСЛЕ экшена №2"
        >
          №
        </div>
        <div title="Название экшена (действия)">+</div>
        <div title="НОВОЕ значение заработка клиента в %">%</div>
        <div title="Дата события">Дата</div>
        <div
          title="Панель с кнопками управления событиями. Наведите на иконки действий, чтобы увидеть подсказку"
        >
          Управление
        </div>
      </div>
      <div
        v-for="(action, i) in actions.data"
        :key="i"
        class="actions__table"
        :class="{
          'closed-editor': editorOn,
          selected: i === currentActionID,
        }"
      >
        <div
          class="actions__table--name"
          title="Порядковый номер экшена. Чем больше - тем раньше он произошел. Экшн №1, например, произошел ДО экшена №2"
        >
          {{ actions.data.length - i }}
        </div>
        <div class="actions__table--name">
          {{ actionNames[action.name] | text }}
        </div>
        <div class="actions__table--value">
          {{ action.value | number2 }}
        </div>
        <div class="actions__table--date">
          {{ action.date | dateWithoutTime }}
          <span>
            {{ action.date | dateWithoutDate }}
          </span>
        </div>
        <div class="actions__table--item">
          <img
            src="@/assets/icons/edit.svg"
            alt="edit"
            title="Редактировать действие"
            @click="$emit('setActionToEditor', i)"
          />
          <img
            src="@/assets/icons/copy.png"
            alt="copy"
            title="Дублировать действие. Копия появится вверху списка."
            @click="$emit('copyAction', i)"
          />
          <!-- <img
            src="@/assets/icons/move.png"
            alt="move"
            title="Переместить действие. В выпадающем окне укажите новый индекс действия. Экшн, который сейчас на заданном индексе, сдвинется вниз"
            @click="$emit('moveAction', i)"
          /> -->
          <el-popconfirm
            title="Удалить?"
            @confirm="$emit('deleteAction', i)"
            icon-color="#f00"
          >
            <!-- <el-popconfirm
            title="Подтверждаете удаление?"
            @confirm="$emit('deleteAction', i)"
          > -->
            <button
              slot="reference"
              type="button"
              class="btn-close"
              aria-label="close"
              title="Удалить действие навсегда. После сохранения изменений это действие нельзя будет отменить!"
            ></button>
          </el-popconfirm>
        </div>
      </div>
      <div
        class="actions__empty"
        v-if="!actions.data || actions.data.length === 0"
      >
        Нет действий
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionsList',
  props: {
    actions: {
      type: Object,
      required: true,
    },
    actionNames: {
      type: Object,
      required: true,
    },
    currentActionID: {
      type: Number,
      required: true,
    },
    editorOn: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
$id-cs: 18px;

$grid: $id-cs 1fr 0.5fr 1.3fr 1fr;

.actions {
  &__empty {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    color: #a2a2a2;
    font-size: 1em;
    line-height: 1;
    padding-top: 15px;
  }

  &__table {
    display: grid;
    grid-gap: padding();
    grid-template-columns: $grid;
    border-bottom: 1px solid $gray;
    padding: padding(0.3) 1px;
    font-size: 13px;
    justify-items: center;
    align-items: center;
    line-height: 1;

    border-left: 1px solid #a2a2a2;
    border-right: 1px solid #a2a2a2;

    @include media-down('m') {
      grid-gap: padding();
      justify-content: space-between;
      grid-template-columns: $grid;
    }

    @include media-down('m-s') {
      width: max-content;
    }

    &.selected {
      background-color: aliceblue;
    }

    & > div {
      width: 100%;
      text-align: center;
      // outline: 1px dotted coral;
    }

    &--item {
      display: grid;
      grid-template-columns: repeat(3, 20px);
      justify-content: space-evenly;

      img {
        width: 20px;
        opacity: 0.9;
        cursor: pointer;

        @include scaleble(1.2);

        &:hover {
          opacity: 1;
        }
      }
    }

    &--contain {
      width: 100%;

      // border-left: 1px solid #a2a2a2;
      // border-right: 1px solid #a2a2a2;
      // border-top: 1px solid #a2a2a2;

      @include media-down('m-s') {
        overflow-x: scroll;
      }
    }

    &--date {
      span {
        opacity: 0.5;
        font-size: 12px;
      }

      text-align: center;
    }

    &--value {
      text-align: right !important;
      width: 100%;
    }

    &--header {
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      border: none;
      border-bottom: 1px solid #a2a2a2;
      padding: padding() 1px;
    }

    // &--value {
    //   text-align: right;
    // }
  }
}
</style>
