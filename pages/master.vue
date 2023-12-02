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

<script lang="ts" setup>
  import InviteCodes from '~/components/Master/InviteCodes.vue';
  import Clients from '~/components/Master/Clients.vue';
  import Tabs from '~/components/Master/Tabs.vue';
  import API from '~/utils/API/API';
  import { useStore } from 'vuex';

  const store = useStore();

  const tabs = [
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
  ];

  const INVITE_CODES = computed(() => store.getters['INVITE_CODES']);
  const USER_AUTHENTICATED = computed(
    () => store.getters['USER_AUTHENTICATED']
  );

  onMounted(() => {
    store.dispatch('LOAD_INVITE_CODES');
  });

  watch(USER_AUTHENTICATED, (n) => {
    if (store.getters['AUTH_LOGIN_LOADING']) return;

    if (n === false || store.getters['IS_ADMIN'] === false) {
      navigateTo('/404');
    }
  });

  function removeCode(code: string) {
    store.dispatch('REMOVE_CODE', code);
  }

  function createCode(comment: string) {
    const date = new Date();

    API.generateInviteCode(comment)
      .then((res: { code: string; comment: string }) => {
        store.dispatch('ADD_GENERATED_INVITE_CODE', {
          code: res.code,
          comment: res.comment,
          loading: false,
          created_at: date,
        });
      })
      .catch((err: any) => {
        console.log('generateInviteCode failed', err);
      });
  }
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
