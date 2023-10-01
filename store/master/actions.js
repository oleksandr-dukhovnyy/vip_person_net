export default {
  namespaced: true,
  actions: {
    SET_CURRENT_CLIENT({ commit }, id) {
      commit('SET_CURRENT_CLIENT', id);
    },
  },
  mutations: {
    SET_CURRENT_CLIENT(state, id) {
      state.currentClient = id;

      if (globalThis?.localStorage) {
        localStorage.setItem('master-currentClient', id);
      }
    },
  },
  state: {
    currentClient:
      +globalThis?.localStorage?.getItem('master-currentClient') || 0,
  },
  getters: {
    CURRENT_CLIENT(stateActions, _, __, gettersAuth) {
      if (
        gettersAuth.CLIENTS &&
        gettersAuth.CLIENTS[stateActions.currentClient]
      ) {
        return {
          ...gettersAuth.CLIENTS[stateActions.currentClient],
        };
      }

      return {};
    },
    CURRENT_CLIENT_ID(stateActions) {
      return stateActions.currentClient;
    },
  },
};
