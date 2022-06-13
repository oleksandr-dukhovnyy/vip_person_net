<template>
  <div class="row">
    <div class="table--contain">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Код</th>
            <th scope="col">Коментарий</th>
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
            <td>{{ code.code }}</td>
            <td>{{ code.comment }}</td>
            <td>{{ code.created_at | timeFromISO8601 }}</td>
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
    </div>
    <button
      type="button"
      class="btn btn-primary create-bttn"
      @click="createCode()"
    >
      Сгенерировать код приглашения
    </button>
  </div>
</template>

<script>
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
  }),
  watch: {
    inviteCodes(n) {
      this.setCodes(n);
    },
  },
  created() {
    this.setCodes(this.inviteCodes);
  },
  methods: {
    setCodes(n) {
      this.inviteCodesToRender = n.map((c) => ({ ...c, loading: false }));
    },
    removeCode(i) {
      this.$emit('removeCode', i);
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

.create-bttn {
  margin: padding() auto 0;
  width: max-content;

  font-size: 15px;

  @include scaleble(1.05);
}
</style>
