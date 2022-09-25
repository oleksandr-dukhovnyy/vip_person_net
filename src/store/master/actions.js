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
      localStorage.setItem('master-currentClient', id);
    },
  },
  state: {
    currentClient: +localStorage.getItem('master-currentClient') || -1,
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
