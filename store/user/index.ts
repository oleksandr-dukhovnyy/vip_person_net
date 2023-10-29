import { defineStore } from 'pinia';
import authAPI from '~/API/auth';
import userAPI from '~/API/user';
import actionsAPI from '~/API/actions';

const useUserStore = defineStore('user', {
  actions: {
    async AUTO_AUTHENTICATE() {
      const session = await authAPI.AUTO_AUTH();

      if (session.data?.email) {
        console.log('session', session);
        this.apiClient = session.data;

        // commit('SET_NAME', session.data.user_metadata.name);
        // commit('SET_EMAIL', session.data.email);
      }

      return session.ok;
    },
    async LOAD_CLIENT_DATA() {
      const userData = await actionsAPI.LOAD_MY_ACTIONS();
    },
    async LOGIN(api: any, email: string, password: string) {
      return false;
    },
  },
  state: (): User.Store.State => ({
    name: null,
    email: null,
    deposit: null,
    actions: null,
    apiClient: null,
  }),
  getters: {
    AUTHENTICATED: (state) => state.name !== null,
    NAME: (state) => null,
    EMAIL: (state) => null,
    DEPOSIT: (state) => null,
    ACTIONS: (state) => null,
  },
});

export default useUserStore;
