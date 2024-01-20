<template>
  <div class="actions--contain">
    <div class="actions">
      <div class="actions__list-contain">
        <ModeledTabs
          v-model="selectedChunk"
          :list="tabsList"
        >
          <template #default="{ data: actionsChunk }">
            <div
              v-if="actionsChunk"
              style="display: flex; gap: 8px; padding: 8px"
            >
              <ActionsList
                v-for="(actionList, j) in actionsChunk.data"
                :key="j"
                :actions="actionList"
                :current-action-id="j === 0 ? currentActionID : -1"
                :action-names="actionNames"
                :editor-on="editor.show.value"
                @set-action-to-editor="
                  (index: number) => setActionToEditor(index, actionList)
                "
                @delete-action="
                  (index: number) => deleteAction(index, actionList)
                "
                @copy-action="(index: number) => copyAction(index, actionList)"
              />
              <!-- @move-action="(index: number) => moveAction(index, actionList)" -->
            </div>
          </template>
        </ModeledTabs>
      </div>
      <div
        v-if="editor.show.value"
        class="actions__action-editor"
      >
        <!-- <div class="actions__action-editor--close-contain">
          <button
            type="button"
            class="btn-close actions__action-editor--close"
            aria-label="close"
            @click="closeEditor"
          ></button>
        </div> -->
        <div class="actions__action-editor--inpus">
          <select v-model="editor.name.value">
            <option
              value=""
              selected
              disabled
            >
              Действие
            </option>
            <option value="put">Пополнение</option>
            <option value="withdrawal">Снятие</option>
            <option value="round-end">Окночание торгового раунда</option>
            <option value="open">Открытие счёта</option>
          </select>
          <input
            v-model="editor.value.value"
            type="text"
            placeholder="Значение"
            title="Новый процент клиента. Можно со знаком %, можно без."
          />
          <!-- <eui-date
            v-model="editor.date"
            type="datetime"
            placeholder="Select date and time"
            default-time="00:00:00"
            size="small"
            name="date"
          >
          </eui-date> -->
          <DatePicker
            v-model="editor.date.value"
            placeholder="Укажите дату и/или время"
          />
        </div>

        <div class="actions__action-editor--buttons">
          <button
            type="button"
            class="btn btn-success"
            :disabled="!editor.edited.value"
            @click="editorSave"
          >
            Сохранить
          </button>
          <button
            type="button"
            class="btn btn-dark"
            @click="closeEditor"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="!SAVE_USER_DATA_LOADING"
      class="actions__new-action"
    >
      <div
        v-for="(actionsList, index) in actionsChunks[+selectedChunk]"
        :key="index"
      >
        <button
          type="button"
          class="btn btn-success actions__new-action--button"
          :title="`Создать новый экшн. Он появится сверху списка действий`"
          @click="newAction(actionsList)"
        >
          <img
            src="@/assets/svg/plus_icon.svg"
            alt="+"
          />
        </button>
        <!-- <el-color-picker
          v-model="actionsList.color"
          show-alpha
          color-format="hex"
        /> -->
        <input
          v-model="actionsList.color"
          type="color"
        />
      </div>
    </div>
    <div class="dropdown-divider dropdown-divider--top"></div>
    <!-- <div v-if="!SAVE_USER_DATA_LOADING">
			<ClientTable
				:client="client"
			/>
		</div>
		<div class="dropdown-divider dropdown-divider--top"></div> -->
    <div
      v-if="!SAVE_USER_DATA_LOADING"
      class="actions__save-changes"
    >
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
        title="Отправить изменения на сервер. Это действие нельзя отменить!"
        @click="saveChanges"
      >
        Сохранить изменения
      </button>
      <!-- </el-badge> -->

      <button
        type="button"
        class="btn btn-dark"
        :disabled="!HAS_UNSAVED_CLIENTS_DATA"
        title="Сбросить не сохраненные изменения."
        @click="resetChanges"
      >
        Отменить изменения
      </button>
    </div>
    <Loader v-else />
  </div>
</template>

<script lang="ts" setup>
  // import Pagination from '~/components/Pagination/Pagination.vue';
  // import ClientTable from '../ClientTable.vue';
  import ActionsList from './ActionsList.vue';
  import cloneObject from '~/helpers/cloneObject.js';
  import DatePicker from '../DatePicker.vue';
  import ModeledTabs from '~/components/ModeledTabs.vue';

  import { useStore } from 'vuex';
  const store = useStore();

  const actionNames = {
    put: 'Пополнение',
    withdrawal: 'Вывод',
    'round-end': 'Ролловер',
    open: 'Открытие счёта',
  };

  const editor = {
    name: ref<Client.Action['name']>('put'),
    date: ref(''),
    value: ref(''),
    show: ref(false),
    edited: ref(false),
    promise: ref<Promise<void> | null>(null),

    // Dynamic method
    commit(arg: Client.Action) {
      console.log('commit', arg);
    },
  };

  // State
  const currentActionID = ref(-1);
  // const selectedActionsList = ref(0);
  const selectedChunk = ref(0);
  const chunkPage = ref(0);

  // Computed
  const actions = computed(
    () => store.getters['actions/CURRENT_CLIENT'].actions || []
  );

  const actionsChunks = computed(() => {
    return [
      [actions.value[0] || {}, actions.value[1] || {}],
      [actions.value[2] || {}, actions.value[3] || {}],
    ];
  });

  const SAVE_USER_DATA_LOADING = computed(
    () => store.getters['SAVE_USER_DATA_LOADING']
  );
  const HAS_UNSAVED_CLIENTS_DATA = computed(
    () => store.getters['HAS_UNSAVED_CLIENTS_DATA']
  );

  // const clientDataChanged = ref(false);

  const tabsList = computed(() => {
    return (actionsChunks.value || []).map((chunks, i) => ({
      key: '' + i,
      data: chunks,
      title: '' + (i + 1),
    }));
  });

  // Watchers
  watch(chunkPage, (n) => (selectedChunk.value = +n));
  watch(editor.name, onEditorChange);
  watch(editor.date, onEditorChange);
  watch(editor.value, onEditorChange);

  function onEditorChange() {
    editor.edited.value = true;
  }

  // Methods
  function openEditor(
    {
      name,
      date,
      value,
    }: { name: Client.Action['name']; date: string; value: string } = {
      name: 'put',
      date: '',
      value: '',
    }
  ) {
    editor.show.value = true;
    editor.name.value = name;
    editor.date.value = date;
    editor.value.value = value;
    editor.edited.value = false;
  }

  function closeEditor() {
    // TODO: refactor candidate

    // May be just
    editor.show.value = false;
    // is enough

    editor.name.value = 'put';
    editor.date.value = '';
    editor.value.value = '';
    editor.edited.value = false;
  }

  function setActionToEditor(
    actionIndex: number,
    actionsList: Client.ActionsList
  ) {
    openEditor(actionsList.data[actionIndex]);

    editor.commit = (newActionData: Client.Action) => {
      store.dispatch('UPDATE_CLIENT_ACTIONS', {
        clientID: store.getters['actions/CURRENT_CLIENT_ID'],
        actionsListID: actionsList.id,
        newActionData,
        actionIndex,
      });
    };
  }

  // function moveAction(actionIndex: number, actionsList: Client.ActionsList) {
  //   const to = prompt('На какую позицию перемещать?');

  //   if (to === null || to === '' || !/^[0-9]{0,10}$/.test(to)) return;

  //   store.dispatch('MOVE_ACTION', {
  //     actionsListID: actionsList.id,
  //     actionIndex,
  //     to: +to,
  //   });

  //   // store.dispatch('UPDATE_CLIENT_ACTIONS', {
  //   //   clientID: store.getters['actions/CURRENT_CLIENT_ID'],
  //   //   actionsListID: actionsList.id,
  //   //   newActionData: {
  //   //     ...actionsList.data[actionIndex],
  //   //     date: actionsList.data[actionIndex].date,
  //   //     name: actionsList.data[actionIndex].name,
  //   //   },
  //   //   actionIndex: +to,
  //   // });
  // }

  function editorSave() {
    editor.commit({
      name: editor.name.value,
      date: editor.date.value,
      value: editor.value.value,
    });

    editor.edited.value = false;
  }

  function copyAction(actionIndex: number, actionsList: Client.ActionsList) {
    store.dispatch('ADD_CLIENT_ACTION', {
      actionsListID: actionsList.id,
      newAction: cloneObject(actionsList.data[actionIndex]),
    });
  }

  function deleteAction(actionIndex: number, actionsList: Client.ActionsList) {
    store.dispatch('DELETE_ACTION', {
      actionsListID: actionsList.id,
      actionIndex,
    });
  }

  function resetChanges() {
    store.dispatch('RESET_CHANGES', {
      clientID: store.getters['actions/CURRENT_CLIENT_ID'],
    });
  }

  function saveChanges() {
    store.dispatch(
      'SAVE_USER_DATA',
      JSON.parse(JSON.stringify(store.getters['actions/CURRENT_CLIENT']))
    );
  }

  function newAction(actionsList: Client.ActionsList) {
    store.dispatch('ADD_CLIENT_ACTION', {
      actionsListID: actionsList.id,
      newAction: { date: new Date().toISOString(), value: '', name: '' },
    });

    setActionToEditor(0, actionsList);
  }
</script>

<style scoped lang="scss">
  // sizes (cs - ceil size)
  $id-cs: 18px;
  $name-cs: 1fr;
  $name-cs-small: 92px;
  $value-cs: 80px;
  $date-cs: 125px;
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
