export default {
  namespaced: true,
  actions: {
    /**
     * Sets the current client.
     *
     * @param {Object} commit - The commit object.
     * @param {string} id - The ID of the client.
     */
    SET_CURRENT_CLIENT({ commit }, id) {
      commit('SET_CURRENT_CLIENT', id);
    },
  },
  mutations: {
    /**
     * Sets the current client in the state.
     *
     * @param {object} state - The state object.
     * @param {number} id - The ID of the client.
     */
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
    /**
     * Returns the current client object from the stateActions object, if it exists.
     *
     * @param {Object} stateActions - The stateActions object.
     * @param {Object} _ - Unused parameter.
     * @param {Object} __ - Unused parameter.
     * @param {Object} gettersAuth - The gettersAuth object.
     * @return {Object} The current client object, or an empty object if it does not exist.
     */
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

    /**
     * Returns the current client ID from the given stateActions object.
     *
     * @param {Object} stateActions - The stateActions object containing the current client ID.
     * @return {string} The current client ID.
     */
    CURRENT_CLIENT_ID(stateActions) {
      return stateActions.currentClient;
    },
  },
};
