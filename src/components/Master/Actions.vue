<template>
  <div class="actions--contain">
    <div class="actions">
      <div class="actions__list-contain">
        <el-tabs type="border-card" v-model="chunkPage">
          <el-tab-pane
            v-for="(actionsChunk, i) in actionsChunks"
            :key="i"
            :label="'' + (i + 1)"
          >
            <ActionsList
              v-for="(actionList, j) in actionsChunk"
              :key="i * 100 + j"
              :actions="actionList"
              :currentActionID="
                i === selectedChunk && j === selectedActionsList
                  ? currentActionID
                  : -1
              "
              :actionNames="actionNames"
              :editorOn="editor.show"
              @setActionToEditor="
                (index) => setActionToEditor(index, actionList)
              "
              @moveAction="(index) => moveAction(index, actionList)"
              @deleteAction="(index) => deleteAction(index, actionList)"
              @copyAction="(index) => copyAction(index, actionList)"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="actions__action-editor" v-if="editor.show">
        <!-- <div class="actions__action-editor--close-contain">
          <button
            type="button"
            class="btn-close actions__action-editor--close"
            aria-label="close"
            @click="closeEditor"
          ></button>
        </div> -->
        <div class="actions__action-editor--inpus">
          <select v-model="editor.name">
            <option value="" selected disabled>Действие</option>
            <option value="put">Пополнение</option>
            <option value="withdrawal">Снятие</option>
            <option value="round-end">Окночание торгового раунда</option>
            <option value="open">Открытие счёта</option>
          </select>
          <input
            type="text"
            placeholder="Значение"
            title='Новый процент клиента. Можно со знаком "%", можно без.'
            v-model="editor.value"
          />
          <eui-date
            v-model="editor.date"
            type="datetime"
            placeholder="Select date and time"
            default-time="00:00:00"
            size="small"
            name="date"
          >
          </eui-date>
        </div>

        <div class="actions__action-editor--buttons">
          <button
            type="button"
            class="btn btn-success"
            :disabled="!editor.edited"
            @click="editorSave"
          >
            Сохранить
          </button>
          <button type="button" class="btn btn-dark" @click="closeEditor">
            Закрыть
          </button>
        </div>
      </div>
    </div>
    <div class="actions__new-action" v-if="!SAVE_USER_DATA_LOADING">
      <div
        v-for="(actionsList, index) in actionsChunks[selectedChunk]"
        :key="index"
      >
        <button
          type="button"
          class="btn btn-success actions__new-action--button"
          @click="newAction(actionsList)"
          :title="`Создать новый экшн. Он появится свеху списка действий`"
        >
          <img src="@/assets/svg/plus_icon.svg" alt="+" />
        </button>
        <el-color-picker
          show-alpha
          v-model="actionsList.color"
          color-format="hex"
        />
      </div>

      <!-- <button
        type="button"
        class="btn btn-success actions__new-action--button"
        @click="newAction(1)"
        title="Создать новый экшн. Он появится на позиции 1"
      >
        <img src="@/assets/svg/plus_icon.svg" alt="+" />
      </button>
      <button
        type="button"
        class="btn btn-success actions__new-action--button"
        @click="newAction(2)"
        title="Создать новый экшн. Он появится на позиции 1"
      >
        <img src="@/assets/svg/plus_icon.svg" alt="+" />
      </button> -->
    </div>
    <div class="dropdown-divider dropdown-divider--top"></div>
    <!-- <div v-if="!SAVE_USER_DATA_LOADING">
			<ClientTable
				:client="client"
			/>
		</div>
		<div class="dropdown-divider dropdown-divider--top"></div> -->
    <div class="actions__save-changes" v-if="!SAVE_USER_DATA_LOADING">
      <!-- <Pagination
				:perPage="10"
				:page="0"
				:items="32"

				@pageSelected="pageSelected"
			/> -->
      <!-- <el-badge :value="''" class="item"> -->
      <button
        type="button"
        class="btn btn-success"
        :disabled="!HAS_UNSAVED_CLIENTS_DATA"
        @click="saveChanges"
        title="Отправить изменения на сервер. Это действие нельзя отменить!"
      >
        Сохранить изменения
      </button>
      <!-- </el-badge> -->

      <button
        type="button"
        class="btn btn-dark"
        :disabled="!HAS_UNSAVED_CLIENTS_DATA"
        @click="resetChanges"
        title="Сбросить не сохраненные изменения."
      >
        Отменить изменения
      </button>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination/Pagination.vue';
import ClientTable from '../ClientTable.vue';
import ActionsList from './ActionsList.vue';
import cloneObject from '@/utils/cloneObject.js';

import { mapActions, mapGetters } from 'vuex';
const vuexActions = [
  'SAVE_USER_DATA',
  'UPDATE_CLIENT_ACTIONS',
  'ADD_CLIENT_ACTION',
  // 'MOVE_ACTION',
  'DELETE_ACTION',
  'RESET_CHANGES',
];
const vuexGetters = [
  'SAVE_USER_DATA_LOADING',
  'actions/CURRENT_CLIENT',
  'actions/CURRENT_CLIENT_ID',
  'HAS_UNSAVED_CLIENTS_DATA',
];

function editorChange() {
  this.editor.edited = true;
}

export default {
  name: 'Actions',
  components: { ClientTable, ActionsList /* Pagination */ },
  data() {
    return {
      editor: {
        name: '',
        date: '',
        value: '',
        show: false,
        edited: false,
        promise: null,
        commit() {},
      },
      // selectedPage: 1,
      actionNames: {
        put: 'Пополнение',
        withdrawal: 'Вывод',
        'round-end': 'Ролловер',
        open: 'Открытие счёта',
      },
      currentActionID: -1,
      selectedActionsList: 0,
      selectedChunk: 0,
      chunkPage: 0,
    };
  },
  watch: {
    chunkPage(n) {
      this.selectedChunk = +n;
    },
    'editor.name': editorChange,
    'editor.date': editorChange,
    'editor.value': editorChange,
  },
  methods: {
    ...mapActions(vuexActions),
    openEditor({ name, date, value } = {}) {
      this.editor = {
        ...this.editor,
        show: true,
        name,
        date,
        value,
      };

      this.editor.edited = false;
    },
    closeEditor() {
      this.editor = {
        ...this.editor,
        name: '',
        date: '',
        value: '',
        edited: false,
        show: false,
      };
    },
    setActionToEditor(actionIndex, actionsList) {
      this.openEditor(actionsList.data[actionIndex]);

      this.editor.commit = (newActionData) => {
        this.UPDATE_CLIENT_ACTIONS({
          clientID: this['actions/CURRENT_CLIENT_ID'],
          actionsListID: actionsList.id,
          newActionData,
          actionIndex,
        });
      };
    },
    editorSave() {
      this.editor.commit({
        name: this.editor.name,
        date: this.editor.date,
        value: this.editor.value,
      });

      this.editor = {
        ...this.editor,
        edited: false,
      };
    },
    // moveAction(actionIndex, actionsList) {
    //   const to = prompt('На какую позицию перемещать?');

    //   if (to === null || to === '' || !/^[0-9]{0,10}$/.test(to)) return;

    //   this.MOVE_ACTION({
    //     actionsListID: actionsList.id,
    //     actionIndex,
    //     to: +to,
    //   });
    // },
    copyAction(actionIndex, actionsList) {
      this.ADD_CLIENT_ACTION({
        actionsListID: actionsList.id,
        newAction: cloneObject(actionsList.data[actionIndex]),
      });
    },
    deleteAction(actionIndex, actionsList) {
      this.DELETE_ACTION({
        actionIndex,
        actionsListID: actionsList.id,
      });
    },
    resetChanges() {
      this.RESET_CHANGES();
    },
    saveChanges() {
      this.SAVE_USER_DATA(
        JSON.parse(JSON.stringify(this['actions/CURRENT_CLIENT']))
      );
    },
    newAction(actionsList) {
      this.ADD_CLIENT_ACTION({
        actionsListID: actionsList.id,
        newAction: { date: new Date().toISOString(), value: '', name: '' },
      });

      this.setActionToEditor(0, actionsList);
    },
  },
  computed: {
    ...mapGetters(vuexGetters),
    actions() {
      return this['actions/CURRENT_CLIENT'].actions || [];
    },
    clientDataChanged() {
      return false;
    },
    actionsChunks() {
      return [
        [this.actions[0] || {}, this.actions[1] || {}],
        [this.actions[2] || {}, this.actions[3] || {}],
      ];
    },
  },
};
</script>

<style scoped lang="scss">
// sizes (cs - ceil size)
$id-cs: 18px;
$name-cs: 1fr;
$name-cs-small: 92px;
$value-cs: 80px;
$date-cs: 125px;
$controlls-cs: 100px;

$green-btn-color: #388d66;
$black-btn-color: #373e45;

button {
  &.btn-success {
    background-color: $green-btn-color;
    border: 1px solid $green-btn-color;
  }

  &.btn-dark {
    background-color: $black-btn-color;
    border: 1px solid $black-btn-color;
  }
}

.dropdown-divider {
  &--top {
    margin-top: padding(5);
  }
}

.actions {
  padding: padding() 0;
  display: flex;

  @include media-down('t-l') {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, max-content);
  }

  &.closed-editor {
    display: block;
  }

  &__new-action {
    text-align: right;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: padding();
    justify-items: flex-start;

    // @include media-down('m-s') {
    //   justify-items: center;
    //   grid-template-columns: 1fr 1fr;
    // }

    & > div {
      display: flex;
      gap: padding();
    }

    &--button {
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 20px;
      width: 40px;
      height: 40px;

      text-align: 40px;

      img {
        width: 18px;
        height: 18px;
      }
    }
  }

  &__save-changes {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap: padding();
    justify-content: flex-end;

    button {
      width: 190px;
      height: 40px;
      font-size: 15px;
    }

    @include media-down('m-s') {
      grid-template-columns: 100%;
      grid-template-rows: max-content max-content;
      justify-content: center;
    }
  }

  &__action-editor {
    margin-left: padding();

    padding: padding();

    // width: (235px + paddng(2));
    min-height: 250px;
    max-height: 400px;
    max-width: 255px;
    border: 1px solid rgb(194, 194, 194);
    border-radius: $border-radius;

    display: grid;
    grid-template-rows: 104px 1fr;
    grid-gap: padding();

    @include media-down('t-l') {
      margin: padding() auto;
    }

    &--close-contain {
      text-align: right;
    }

    &--buttons {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-end;
    }

    &--inpus {
      margin: padding();
      input {
        @include input;
        padding: padding();
        margin-bottom: padding();
      }

      select {
        width: 100%;
        border: 1px solid rgb(194, 194, 194);
        border-radius: $border-radius;
        padding: padding();
        margin-bottom: padding();
        font-size: $font-size-small;
      }
    }
  }

  &__list-contain {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: padding();

    .el-tab-pane {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: padding(1);
    }
  }
}
</style>
