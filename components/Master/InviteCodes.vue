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
                @click="removeCode(i)"
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
          style="color: #000; cursor: pointer"
          @click="createCode"
          >Сгенерировать код приглашения</span
        >
        " <br />для создания пригласительного кода
      </div>
    </div>
    <button
      type="button"
      class="btn btn-primary create-bttn"
      @click="createCode"
    >
      Сгенерировать код приглашения
    </button>
  </div>
</template>

<script>
  import { DDMMYYYY_ttmm } from '~/utils/timeParser';

  export default {
    name: 'InviteCodes',
    props: {
      inviteCodes: {
        type: Array,
        required: true,
      },
    },
    data: () => ({
      inviteCodesToRender: [],
      showEmpty: false,
    }),
    watch: {
      inviteCodes(n) {
        this.showEmpty = false;
        this.setCodes(n);
      },
    },
    created() {
      this.setCodes(this.inviteCodes);

      setTimeout(() => {
        if (this.inviteCodes.length === 0) {
          this.showEmpty = true;
        }
      }, 2000);
    },
    methods: {
      setCodes(n) {
        this.inviteCodesToRender = n.map((c) => ({
          ...c,
          loading: false,
          created_at: DDMMYYYY_ttmm(c.created_at),
        }));
      },
      removeCode(i) {
        if (confirm(`Удалить код (${this.inviteCodes[i].code})?`)) {
          this.$emit('removeCode', i);
        }
      },
      createCode() {
        const comment = prompt('Введите комментарий', '');

        if (comment !== null) {
          this.inviteCodesToRender.push({
            code: 'loading...',
            comment,
            created_at: new Date().toISOString(),
            loading: true,
          });
          this.$emit('createCode', comment);
        }
      },
    },
  };
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
      @include scaleble(1.2);
    }
  }

  .muted {
    @include muted;
    text-align: center;
  }

  .create-bttn {
    margin: padding() auto 0;
    width: max-content;

    font-size: 15px;

    @include scaleble(1.05);
  }
</style>
