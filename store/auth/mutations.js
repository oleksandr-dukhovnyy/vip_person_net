/**
 * Maps over an array of clients and updates a specific client's data based on the provided client ID.
 *
 * @param {Array} clients - The array of clients to be mapped over.
 * @param {string} clientID - The ID of the client whose data needs to be updated.
 * @param {Function} callback - The callback function that will be used to update the client's data.
 * @return {Array} - The updated array of clients.
 */
const changeClientData = (clients, clientID, callback) =>
  clients.map((client) => (client.id === clientID ? callback(client) : client));

export default {
  /**
   * Sets the value of a loader in the state.
   *
   * @param {Object} state - The state object.
   * @param {Object} options - The options object.
   * @param {string} options.loaderName - The name of the loader.
   * @param {boolean} [options.loaderCondition=true] - The condition of the loader. Defaults to true.
   */
  SET_LOADER(state, { loaderName, loaderCondition = true }) {
    state.loaders[loaderName] = loaderCondition;
  },

  /**
   * Sets the error in the state for the specified module.
   *
   * @param {Object} state - The state object.
   * @param {Object} err - The error object.
   * @param {string} module - The module name.
   */
  SET_ERROR(state, { err, module }) {
    state.errors[module] = err;
  },

  /**
   * Sets the user data in the state.
   *
   * @param {object} state - The state object.
   * @param {any} payload - The payload containing the user data.
   */
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },

  /**
   * Sets the invite codes in the state.
   *
   * @param {Array} codes - The invite codes to be set.
   */
  SET_INVITE_CODES(state, codes) {
    state.inviteCodes = codes;
  },

  /**
   * Removes a code from the inviteCodes array in the state.
   *
   * @param {any} state - The state object.
   * @param {string} code - The code to be removed.
   */
  REMOVE_CODE(state, code) {
    state.inviteCodes = state.inviteCodes.filter((c) => c.code !== code);
  },

  /**
   * Sets the clients in the state and updates the oldData property.
   *
   * @param {Object} state - The current state object.
   * @param {Array} clients - The array of clients to be set in the state.
   */
  SET_CLIENTS(state, clients) {
    state.clients = clients;

    state.oldData = JSON.stringify(state.clients);
  },

  /**
   * Sets the user in the state.
   *
   * @param {Object} state - The state object.
   * @param {Object} user - The user object to be set.
   */
  SET_USER(state, user) {
    state.user = user;
  },

  /**
   * Clears the state of the application.
   *
   * @param {object} state - The state object to be cleared.
   */
  CLEAR_STATE(state) {
    state.user = {};
    state.userData = null;
    state.loaders = {
      login: false,
      register: false,
      loadClients: false,
      SAVE_USER_DATA: false,
    };
    state.errors = {
      login: null,
      register: null,
    };
    state.inviteCodes = [];
    state.clients = [];
    state.oldData = '';
  },

  /**
   * Fixate the old data in the state.
   *
   * @param {type} state - the state object
   * @return {type} undefined
   */
  FIXATE_OLD_DATA(state) {
    state.oldData = JSON.stringify(state.clients);
  },

  /**
   * Updates the client actions in the state based on the provided payload.
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - The payload object containing the necessary data for updating the client actions.
   * @param {number} payload.clientID - The ID of the client.
   * @param {number} payload.actionsListID - The ID of the actions list.
   * @param {Object} payload.newActionData - The new action data to be updated.
   * @param {number} payload.actionIndex - The index of the action to be updated.
   */
  UPDATE_CLIENT_ACTIONS(state, payload) {
    const { clientID, actionsListID, newActionData, actionIndex } = payload;

    if (
      [clientID, actionsListID, newActionData, actionIndex].some(
        (e) => e === null || e === undefined
      )
    ) {
      return console.error(payload);
    }

    state.clients = state.clients.map((client, index) => {
      if (clientID === index) {
        return {
          ...client,
          actions: client.actions.map((actionList) => {
            if (actionsListID === actionList.id) {
              return {
                ...actionList,
                data: actionList.data.map(
                  (actionListDataItem, actionListDataIndex) => {
                    if (actionListDataIndex === actionIndex) {
                      return newActionData;
                    }

                    return actionListDataItem;
                  }
                ),
              };
            }

            return actionList;
          }),
        };
      }

      return client;
    });

    // state.oldData = JSON.stringify(state.clients);
  },

  /**
   * Adds a client action to the state.
   *
   * @param {object} state - The current state object.
   * @param {object} payload - The payload object containing the necessary data.
   * @param {string} payload.actionsListID - The ID of the actions list.
   * @param {string} payload.clientID - The ID of the client.
   * @param {object} payload.newAction - The new action to be added.
   */
  ADD_CLIENT_ACTION(state, payload) {
    const { actionsListID, clientID, newAction } = payload;

    state.clients = changeClientData(state.clients, clientID, (client) => {
      return {
        ...client,
        actions: client.actions.map((actionsList) => {
          if (actionsList.id === actionsListID) {
            actionsList.data.unshift(newAction);
          }

          return actionsList;
        }),
      };
    });
  },
  // MOVE_ACTION(state, payload) {
  //   const { clientID, actionsListID, to, actionIndex } = payload;

  //   state.clients = changeClientData(state.clients, clientID, (client) => {
  //     return {
  //       ...client,
  //       actions: client.actions.map((actionsList) => {
  //         if (actionsList.id === actionsListID) {
  //           const clone = actionsList.data;
  //           moveItemInArray(actionsList.data, actionIndex, to);

  //           actionsList.data = clone;
  //         }

  //         return actionsList;
  //       }),
  //     };
  //   });
  // },

  /**
   * Deletes an action from the state.
   *
   * @param {Object} state - The state object.
   * @param {Object} payload - The payload object containing the clientID, actionsListID, and actionIndex.
   */
  DELETE_ACTION(state, payload) {
    const { clientID, actionsListID, actionIndex } = payload;

    state.clients = changeClientData(state.clients, clientID, (client) => {
      return {
        ...client,
        actions: client.actions.map((actionsList) => {
          if (actionsList.id === actionsListID) {
            actionsList.data.splice(actionIndex, 1);
          }

          return actionsList;
        }),
      };
    });
  },

  /**
   * Resets the changes in the state by setting the clients property to the value of the oldData property.
   *
   * @param {object} state - The state object.
   */
  RESET_CHANGES(state) {
    state.clients = JSON.parse(state.oldData);
  },
};
