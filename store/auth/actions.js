import { API } from '~/utils/API/API.js';
import notify from '~/utils/notification.js';
import cloneObject from '~/utils/cloneObject.js';

export default {
  /**
   * Executes the auto authentication process.
   *
   * @param {Object} commit - The commit object from Vuex.
   * @param {Object} dispatch - The dispatch object from Vuex.
   */
  AUTO_AUTH({ commit, dispatch }) {
    // console.log('AUTO_AUTH');
    API.autoAuth().then((user) => {
      // console.log('user', user);
      if (user) {
        commit('SET_USER', user);
        dispatch('LOAD_USER_DATA');
      } // else {
      // AppRouter.push({
      // 	name: 'login',
      // });
      //}
    });
  },

  /**
   * Saves user data.
   *
   * @param {Object} commit - Vuex commit function
   * @param {Object} dispatch - Vuex dispatch function
   * @param {Object} rootGetters - Vuex rootGetters object
   * @return {void}
   */
  SAVE_USER_DATA({ commit, dispatch, rootGetters }) {
    commit('SET_LOADER', {
      loaderName: 'SAVE_USER_DATA',
      loaderCondition: true,
    });
    const _client = cloneObject(rootGetters['actions/CURRENT_CLIENT']);

    API.updateClientData(_client)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          // notify('Сохранение данных пользователя', 'Успешно!');
          notify('Данные пользователей сохранены!');
          dispatch('FIXATE_OLD_DATA');
        } else {
          console.log(res);
          notify(
            `Ошибка! ${res.status} [${res.error?.code || '???'}]: ${
              res.error?.message || 'Неизвестная ошибка'
            }`
          );
          // notify(
          //   'Сохранение данных пользователя',
          //   `Error ${res.status} [${res.error?.code || '???'}]: ${
          //     res.error?.message || 'Неизвестная ошибка'
          //   }`,
          //   'error',
          //   false
          // );
        }
      })
      .catch(console.error)
      .finally(() => {
        commit('SET_LOADER', {
          loaderName: 'SAVE_USER_DATA',
          loaderCondition: false,
        });
      });
  },

  /**
   * Removes a code from the API and updates the state.
   *
   * @param {Object} commit - A function to commit a mutation.
   * @param {string} code - The code to be removed.
   * @return {void}
   */
  REMOVE_CODE({ commit }, code) {
    API.removeCode(code).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        commit('REMOVE_CODE', code);
      }
    });
  },

  /**
   * Adds a generated invite code to the list of invite codes.
   *
   * @param {Object} commit - The commit object for Vuex store.
   * @param {Object} state - The state object for Vuex store.
   * @param {string} code - The generated invite code to be added.
   * @return {void}
   */
  ADD_GENERATED_INVITE_CODE({ commit, state }, code) {
    commit('SET_INVITE_CODES', [...state.inviteCodes, code]);
  },

  /**
   * Loads invite codes and sets them in the store if they exist.
   *
   * @param {Object} commit - The Vuex commit function.
   * @return {void}
   */
  LOAD_INVITE_CODES({ commit }) {
    API.loadInviteCodes().then((res) => {
      if (res.data !== null && res.data.length) {
        commit('SET_INVITE_CODES', res.data);
      }
    });
  },

  /**
   * Loads user data and performs necessary actions.
   *
   * @param {Object} commit - Vuex commit function
   * @param {Object} getters - Vuex getters object
   * @param {Object} dispatch - Vuex dispatch function
   * @return {void}
   */
  LOAD_USER_DATA({ commit, getters, dispatch }) {
    commit('SET_LOADER', {
      loaderName: 'login',
      loaderCondition: true,
    });

    // console.log('LOAD_USER_DATA');

    API.getUserData()
      .then((res) => {
        // console.log('LOAD_USER_DATA', { res });
        commit('SET_USER_DATA', res?.data[0]);

        if (getters.IS_ADMIN) {
          dispatch('LOAD_INVITE_CODES');
        }

        commit('SET_LOADER', {
          loaderName: 'login',
          loaderCondition: false,
        });
      })
      .catch((err) => {
        // commit('SET_ERROR', {
        // 	err,
        // 	module: 'login',
        // });
        commit('SET_LOADER', {
          loaderName: 'login',
          loaderCondition: false,
        });
        console.log(err);
      });
  },

  /**
   * Logs in the user with the provided email and password.
   *
   * @param {Object} commit - The commit object from Vuex.
   * @param {Object} getters - The getters object from Vuex.
   * @param {Object} dispatch - The dispatch object from Vuex.
   * @param {Object} email - The email of the user.
   * @param {Object} password - The password of the user.
   * @return {Promise} A promise that resolves to true if the login is successful.
   */
  async LOGIN({ commit, getters, dispatch }, { email, password }) {
    if (!getters.USER_AUTHED) {
      commit('SET_LOADER', { loaderName: 'login' });

      return API.login(email, password)
        .then(({ data: res, error }) => {
          // console.log('LOGIN:res', res);

          if (error) {
            const message = error.toJSON().message;

            if (message === 'Email not confirmed') {
              notify(
                'Email не подтвержден!\nПожалуйста, потвердите свой Email, перейдя по ссылке в письме.',
                'warning'
              );
            } else if (message === 'Invalid login credentials') {
              notify(
                'Неверные данные для аутентификации! Пара email - пароль не найдена. \n Проверьте правильность ввода',
                'error'
              );
            } else {
              notify(
                `Ошибка - ${message}! Пожалуйста, проверьте правильность ввода`,
                'error'
              );
            }

            return;
          }

          commit('SET_USER', res?.user);
          dispatch('LOAD_USER_DATA');

          if (getters.IS_ADMIN) {
            dispatch('LOAD_CLIENTS');
          }

          commit('SET_LOADER', {
            loaderName: 'login',
            loaderCondition: false,
          });

          // console.log('LOGIN end: res', res);

          if (res.user.role === 'supabase_admin') {
            // return AppRouter.push({ name: 'master' });
            console.log('NAVIGATE TO', 'master');
          }

          if (!res.error) {
            // eslint-disable-next-line
            // navigateTo(`/${next || 'cabinet'}`);
            // AppRouter.push({ name: next });

            return true;
          } else {
            if (res.error.message === 'Invalid login credentials') {
              notify(
                'Неверный Email или пароль',
                'Пожалуйста, проверьте правильность ввода',
                'error'
              );
            }
          }
        })
        .catch((err) => {
          console.error(err);

          commit('SET_LOADER', {
            loaderName: 'login',
            loaderCondition: false,
          });
        })
        .finally(() => {
          commit('SET_LOADER', {
            loaderName: 'login',
            loaderCondition: false,
          });
        });
    } else {
      // console.log('LOGIN user authed');

      return true;
    }
  },

  /**
   * Logs out the user by calling the API logout function and clears the state.
   *
   * @param {object} commit - The commit function from Vuex store.
   * @return {Promise} A promise that resolves when the logout is successful and rejects when there is an error.
   */
  LOGOUT({ commit }) {
    API.logout()
      .then(() => commit('CLEAR_STATE'))
      .catch((err) => {
        console.error(err);
        notify(
          'Ошибка',
          `Не удалось выполнить выход из учётной записи. ${
            err.code ? `Код ошибки: ${err.code}` : ''
          }`,
          'error'
        );
      });
  },

  /**
   * Loads the clients and updates the state with the sorted data.
   *
   * @param {Object} commit - The Vuex commit function.
   * @return {void}
   */
  LOAD_CLIENTS({ commit }) {
    commit('SET_LOADER', {
      loaderName: 'loadClients',
      loaderCondition: true,
    });

    API.loadClients()
      .then((res) => {
        if (res.data) {
          const sorted = res.data.map((client) => {
            return {
              ...client,
              actions: client.actions.map((actionsList) => {
                const clone = cloneObject(actionsList);

                return {
                  ...clone,
                  data: clone.data.sort((actionA, actionB) => {
                    const dateA = new Date(actionA.date).getTime();
                    const dateB = new Date(actionB.date).getTime();

                    return dateB - dateA;
                  }),
                };
              }),
            };
          });

          commit('SET_CLIENTS', sorted);
        } else {
          console.error(res);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        commit('SET_LOADER', {
          loaderName: 'loadClients',
          loaderCondition: false,
        });
      });
  },

  /**
   * Registers a user with the given data.
   *
   * @param {Object} commit - The commit object.
   * @param {Object} data - The user data.
   * @return {void}
   */
  REGISTER({ commit }, data) {
    commit('SET_LOADER', {
      loaderName: 'register',
      loaderCondition: true,
    });
    API.register(data)
      .then(({ data }) => {
        // auto auth
        // { email, password, next = 'cabinet' }

        const user = data.user;

        API.insertUserToUsersDataTabble({
          user_id: user.id,
          actions: [
            { id: 1, data: [], color: '#ccc' },
            { id: 2, data: [], color: '#ccc' },
            { id: 3, data: [], color: '#ccc' },
            { id: 4, data: [], color: '#ccc' },
          ],
          role: user.role,
          data: {
            name: user.user_metadata.name || 'unnamed',
            email: user.email,
          },
        }).then((res) => {
          if (res.status === 201) {
            // dispatch('LOGIN', {
            //   email: data.email,
            //   password: data.password,
            // });
            // AppRouter.push({
            //   name: 'login',
            //   params: {
            //     forceEmail: data.email,
            //     forcePassword: '', //data.password,
            //   },
            // });

            /* eslint-disable-next-line */
            navigateTo(`/login?email=${data.user.email}`);

            // console.log('NAVIGATE TO login', {
            //   forceEmail: data.user.email,
            //   forcePassword: '',
            // });
          }
        });
      })
      .catch((error) => {
        console.log('register error', error);

        if (error.status === 429) {
          notify(
            'Слишком много попыток!',
            `Попробуйте ещё раз через ${error.timeleft || '60'} сек`
          );
        }

        if (error.status === 403 && error.msg === 'invalide code') {
          notify(
            'Пригласительный код не найден',
            'Проверьте его правильность и попробуйте ещё раз',
            'error'
          );
        }
      })
      .finally(() => {
        commit('SET_LOADER', {
          loaderName: 'register',
          loaderCondition: false,
        });
      });
  },

  /**
   * Fixes the old data.
   *
   * @param {Object} commit - The commit object.
   * @return {void}
   */
  FIXATE_OLD_DATA({ commit }) {
    commit('FIXATE_OLD_DATA');
  },

  /**
   * Updates the client actions.
   *
   * @param {Object} commit - The commit object.
   * @param {Object} payload - The payload object.
   */
  UPDATE_CLIENT_ACTIONS({ commit }, payload) {
    commit('UPDATE_CLIENT_ACTIONS', payload);
  },

  /**
   * Adds a client action to the store.
   *
   * @param {Object} commit - The commit function from Vuex.
   * @param {Object} rootGetters - The root getters object from Vuex.
   * @param {Object} payload - The payload object containing the client action data.
   */
  ADD_CLIENT_ACTION({ commit, rootGetters }, payload) {
    commit('ADD_CLIENT_ACTION', {
      ...payload,
      clientID: rootGetters['actions/CURRENT_CLIENT']?.id,
    });
  },
  // MOVE_ACTION({ commit, rootGetters }, payload) {
  //   commit('MOVE_ACTION', {
  //     ...payload,
  //     clientID: rootGetters['actions/CURRENT_CLIENT']?.id,
  //   });
  // },

  /**
   * Deletes an action.
   *
   * @param {Object} commit - The commit object.
   * @param {Object} rootGetters - The root getters object.
   * @param {Object} payload - The payload object.
   */
  DELETE_ACTION({ commit, rootGetters }, payload) {
    commit('DELETE_ACTION', {
      ...payload,
      clientID: rootGetters['actions/CURRENT_CLIENT']?.id,
    });
  },

  /**
   * Resets the changes made to the state.
   *
   * @param {Object} commit - The commit object used to commit changes to the state.
   * @return {void}
   */
  RESET_CHANGES({ commit }) {
    commit('RESET_CHANGES');
  },
};
