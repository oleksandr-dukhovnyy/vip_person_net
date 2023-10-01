<template>
  <NuxtLayout>
    <section class="master">
      <Tabs :tabs="tabs">
        <template #inviteCodes>
          <InviteCodes
            :invite-codes="INVITE_CODES"
            @remove-code="removeCode"
            @create-code="createCode"
          />
        </template>

        <template #clients>
          <Clients />
        </template>
      </Tabs>
    </section>
  </NuxtLayout>
</template>

<script>
  import InviteCodes from '~/components/Master/InviteCodes.vue';
  import Clients from '~/components/Master/Clients.vue';
  import Tabs from '~/components/Master/Tabs.vue';
  import API from '@/utils/API/API.js';
  import { mapActions, mapGetters } from 'vuex';

  const vuexActions = ['ADD_GENERATED_INVITE_CODE', 'REMOVE_CODE'];
  const vuexGetters = [
    'INVITE_CODES',
    'USER_AUTHED',
    'IS_ADMIN',
    'AUTH_LOGIN_LOADING',
  ];

  export default {
    name: 'Master',
    components: {
      InviteCodes,
      Tabs,
      Clients,
    },
    data() {
      return {
        tabs: [
          {
            key: 'inviteCodes',
            title: 'Коды регистрации',
          },
          {
            title: 'Клиенты',
            key: 'clients',
          },
          {
            title: 'Магазин',
            key: 'shop',
          },
          {
            title: 'Тесты',
            key: 'tests',
          },
          {
            title: 'Настройки',
            key: 'settings',
          },
        ],
      };
    },
    computed: mapGetters(vuexGetters),
    // watch: {
    //   USER_AUTHED: {
    //     immediate: true,
    //     handler(n) {
    //       if (
    //         (n === false || this.IS_ADMIN === false) &&
    //         this.AUTH_LOGIN_LOADING === false
    //       ) {
    //         this.$router.replace('/404');
    //       }
    //     },
    //   },
    // },
    methods: {
      ...mapActions(vuexActions),
      removeCode(i) {
        // console.log('removeCode', i, this.INVITE_CODES[i].code);
        this.REMOVE_CODE(this.INVITE_CODES[i].code);
      },
      createCode(comment) {
        const date = new Date();

        API.generateInviteCode(comment)
          .then((res) => {
            console.log({
              createCode: res,
            });

            this.ADD_GENERATED_INVITE_CODE({
              code: res.code,
              comment: res.comment,
              loading: false,
              created_at: date,
            });

            // this.ADD_GENERATED_INVITE_CODE(res.data[0]);
          })
          .catch((err) => {
            console.log('generateInviteCode failed', err);
          });
      },
    },
  };
</script>

<style lang="scss">
  .master {
    max-width: 1400px;
    margin: 0 auto;
    @include page;
    min-height: 101vh;
    padding: 75px;

    padding-left: 0;
    padding-right: 0;

    @include media-down('m') {
      padding: padding(2) 0 0;
    }
  }
</style>
