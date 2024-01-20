export default {
  namespaced: true,
  actions: {
    /**
     * Sets the current client.
     */
    SET_CURRENT_CLIENT({ commit }: any, id: string) {
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
    SET_CURRENT_CLIENT(state: any, id: number) {
      state.currentClient = id;

      if (globalThis?.localStorage) {
        localStorage.setItem('master-currentClient', '' + id);
      }
    },
  },
  state: {
    currentClient: +(
      globalThis?.localStorage?.getItem?.('master-currentClient') || 0
    ),
  },
  getters: {
    /**
     * Returns the current client object from the stateActions object, if it exists.
     */
    CURRENT_CLIENT(
      stateActions: any,
      _: object,
      __: object,
      gettersAuth: any
    ): object {
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
    // @ts-ignore
    CURRENT_CLIENT_ID(stateActions: any): string {
      return stateActions.currentClient;
    },
  },
};
