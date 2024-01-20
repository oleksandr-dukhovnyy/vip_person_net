<template>
  <div class="row">
    <div class="table--contain">
      <table
        v-if="inviteCodesToRender.length > 0"
        class="table"
      >
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Код</th>
            <th scope="col">Заметка по резиденту</th>
            <th scope="col">Создан</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(code, i) in inviteCodesToRender"
            :key="i"
            :class="{ loading: code.loading }"
          >
            <td scope="row">{{ i + 1 }}</td>
            <td class="code">{{ code.code }}</td>
            <td>{{ code.comment }}</td>
            <td>{{ code.created_at }}</td>
            <td>
              <button
                v-if="!code.loading"
                type="button"
                class="btn-close"
                aria-label="Close"
                title="Удалить код. С этим кодом уже нельзя будет зарегистрироваться!"
                @click="removeCode(code.code)"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
      <Loader v-else-if="!showEmpty" />
      <div
        v-else
        class="muted"
      >
        Коды не найдены. Нажмите на кнопку "<span
          class="action-btn"
          @click="createCode"
          >Сгенерировать код приглашения</span
        >" <br />для создания пригласительного кода
      </div>
    </div>
    <button
      type="button"
      class="btn btn-primary create-btn"
      @click="createCode"
    >
      Сгенерировать код приглашения
    </button>
  </div>
</template>

<script lang="ts" setup>
  import { DDMMYYYY_ttmm } from '~/helpers/timeParser';

  const props = defineProps<{
    inviteCodes: Client.InviteCode[];
  }>();

  const emit = defineEmits<{
    (e: 'create-code', comment: string): void;
    (e: 'remove-code', code: string): void;
  }>();

  const inviteCodes = computed(() => props.inviteCodes);

  const showEmpty = ref(false);
  const inviteCodesToRender = ref([] as Client.InviteCode[]);

  watch(inviteCodes, (n) => {
    showEmpty.value = false;
    setCodes(n);
  });

  setCodes(inviteCodes.value);
  setTimeout(() => {
    if (inviteCodes.value.length === 0) {
      showEmpty.value = true;
    }
  }, 2000);

  function setCodes(n: Client.InviteCode[]) {
    inviteCodesToRender.value = n.map((c) => ({
      ...c,
      loading: false,
      created_at: DDMMYYYY_ttmm(c.created_at),
    }));
  }

  function removeCode(code: Client.InviteCode['code']) {
    if (confirm(`Удалить код (${code})?`)) {
      emit('remove-code', code);
    }
  }

  function createCode() {
    const comment = prompt('Введите комментарий', '');

    if (comment !== null) {
      inviteCodesToRender.value.push({
        code: 'loading...',
        comment,
        created_at: new Date().toISOString(),
        loading: true,
      });

      emit('create-code', comment);
    }
  }
</script>

<style scoped lang="scss">
  .row {
    max-width: 1000px;
    margin: 0 auto;

    th {
      font-size: 14px;
      text-align: center;
    }

    td {
      font-size: 13px;
      text-align: center;

      &.code {
        width: 139px;
      }
    }

    .table--contain {
      @include media-down('m-s') {
        overflow-x: scroll;
      }
    }

    .loading {
      opacity: 0.5;
    }

    .btn-close {
      @include scalable(1.2);
    }
  }

  .muted {
    @include muted;

    text-align: center;
  }

  .create-btn {
    width: max-content;
    margin: padding() auto 0;
    font-size: 15px;

    @include scalable(1.05);
  }

  .action-btn {
    color: #000;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
