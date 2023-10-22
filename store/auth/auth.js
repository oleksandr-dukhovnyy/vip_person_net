import { API } from '~/utils/API/API.js';
// import { AppRouter } from '~/main';
import notify from '~/utils/notification.js';
// import moveItemInArray from '@/utils/moveItemInArray.js';
import cloneObject from '~/utils/cloneObject.js';

const changeClientData = (clients, clientID, callback) => {
  return clients.map((client) => {
    if (client.id === clientID) {
      return callback(client);
    }

    return client;
  });
};

// 99-57
// lohowac237@ovout.com
// lohowac237@ovout.com

export default {
  /* TODO: split state to modules */
  actions: {
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
    REMOVE_CODE({ commit }, code) {
      API.removeCode(code).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          commit('REMOVE_CODE', code);
        }
      });
    },
    ADD_GENERATED_INVITE_CODE({ commit, state }, code) {
      commit('SET_INVITE_CODES', [...state.inviteCodes, code]);
    },
    LOAD_INVITE_CODES({ commit }) {
      API.loadInviteCodes().then((res) => {
        if (res.data !== null && res.data.length) {
          commit('SET_INVITE_CODES', res.data);
        }
      });
    },
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
    FIXATE_OLD_DATA({ commit }) {
      commit('FIXATE_OLD_DATA');
    },
    UPDATE_CLIENT_ACTIONS({ commit }, payload) {
      commit('UPDATE_CLIENT_ACTIONS', payload);
    },
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
    DELETE_ACTION({ commit, rootGetters }, payload) {
      commit('DELETE_ACTION', {
        ...payload,
        clientID: rootGetters['actions/CURRENT_CLIENT']?.id,
      });
    },
    RESET_CHANGES({ commit }) {
      commit('RESET_CHANGES');
    },
  },
  mutations: {
    SET_LOADER(state, { loaderName, loaderCondition = true }) {
      state.loaders[loaderName] = loaderCondition;
    },
    SET_ERROR(state, { err, module }) {
      state.errors[module] = err;
    },
    SET_USER_DATA(state, payload) {
      state.userData = payload;
    },
    SET_INVITE_CODES(state, codes) {
      state.inviteCodes = codes;
    },
    REMOVE_CODE(state, code) {
      state.inviteCodes = state.inviteCodes.filter((c) => c.code !== code);
    },
    SET_CLIENTS(state, clients) {
      state.clients = clients;

      state.oldData = JSON.stringify(state.clients);
    },
    SET_USER(state, user) {
      state.user = user;
    },
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
    FIXATE_OLD_DATA(state) {
      state.oldData = JSON.stringify(state.clients);
    },
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
    RESET_CHANGES(state) {
      state.clients = JSON.parse(state.oldData);
    },
  },
  state: {
    user: {},
    userData: null,
    loaders: {
      login: false,
      register: false,
      loadClients: false,
      SAVE_USER_DATA: false,
    },
    errors: {
      login: null,
      register: null,
    },
    clients: [],
    oldData: '',
    inviteCodes: [],
  },
  getters: {
    CLIENT: (s) => s.user,
    CLIENTS: (s) => s.clients,
    IS_ADMIN: (s) => s.userData?.role === 'admin',
    OLD_DATA: (s) => s.oldData,
    USER_NAME: (s) => s.userData?.data?.name || s.user?.email || 'Гость',
    CLIENT_DATA: (s) => s.userData,
    USER_AUTHED: (s) => s.user?.aud === 'authenticated',
    IS_RESIDENT: (s) => s.userData?.role === 'resident',
    INVITE_CODES: (s) => s.inviteCodes,
    CLIENTS_LOADING: (s) => s.loaders.loadClients,
    REGISTER_LOADING: (s) => s.loaders.register || false,
    AUTH_LOGIN_LOADING: (s) => s.loaders.login,
    SAVE_USER_DATA_LOADING: (s) => s.loaders.SAVE_USER_DATA,
    HAS_UNSAVED_CLIENTS_DATA: (s) => JSON.stringify(s.clients) !== s.oldData,
  },
};

// export default {
//   actions: {},
//   mutations: {},
//   state: {},
//   getters: {},
// };
