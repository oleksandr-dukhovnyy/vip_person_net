import API from '@/utils/API/API.js';
import { AppRouter } from '@/main';
import notificate from '@/utils/notification.js';

let client = new API();

const rolesTranslate = {
	resident: 'Резидент',
	admin: 'Администратор',
	user: 'Пользователь',
};

export default {
	actions: {
		AUTO_AUTH({ commit, dispatch }) {
			client.autoAuth().then((user) => {
				if (user) {
					commit('SET_USER', user);
					dispatch('LOAD_USER_DATA');
				} else {
					AppRouter.push({
						name: 'login',
					});
				}
			});
		},
		SAVE_USER_DATA({ commit }, _client) {
			commit('SET_LOADER', {
				loaderName: 'SAVE_USER_DATA',
				loaderCondition: true,
			});

			client
				.updateClientData(_client)
				.then((res) => {
					if (res.status === 200) {
						notificate('Сохранение данных пользователя', 'Успешно!');
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
			client.removeCode(code).then((res) => {
				if (res.status === 200) {
					commit('REMOVE_CODE', code);
				}
			});
		},
		ADD_GENERATED_INVITE_CODE({ commit, state }, code) {
			commit('SET_INVITE_CODES', [...state.inviteCodes, code]);
		},
		LOAD_INVITE_CODES({ commit }) {
			client.loadInviteCodes().then((res) => {
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

			client
				.getUserData()
				.then((res) => {
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
		LOGIN(
			{ commit, getters, dispatch },
			{ email, password, next = 'cabinet' }
		) {
			if (!getters.USER_AUTHED) {
				commit('SET_LOADER', { loaderName: 'login' });
				client
					.login(email, password)
					.then((res) => {
						commit('SET_USER', res?.user);
						dispatch('LOAD_USER_DATA');

						if (getters.IS_ADMIN) {
							dispatch('LOAD_CLIENTS');
						}

						commit('SET_LOADER', {
							loaderName: 'login',
							loaderCondition: false,
						});

						AppRouter.push({ name: next });
					})
					.catch((err) => {
						console.error(err);
					})
					.finally(() => {
						commit('SET_LOADER', {
							loaderName: 'login',
							loaderCondition: false,
						});
					});
			} else {
				console.log(`LOGIN user authed`);
			}
		},
		LOGOUT() {
			client.logout();
		},
		LOAD_CLIENTS({ commit }) {
			commit('SET_LOADER', {
				loaderName: 'loadClients',
				loaderCondition: true,
			});

			client
				.loadClients()
				.then((res) => {
					if (res.data) {
						commit('SET_CLIENTS', res.data);
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
		SET_CLIENTS(state, arr) {
			state.clients = arr.map((user) => ({
				...user,
				roleRu: rolesTranslate[user.role]
					? rolesTranslate[user.role]
					: user.role,
			}));
		},
		SET_USER(state, user) {
			state.user = user;
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
		inviteCodes: [],
		clients: [],
	},
	getters: {
		AUTH_LOGIN_LOADING: (s) => s.loaders.login,
		SAVE_USER_DATA_LOADING: (s) => s.loaders.SAVE_USER_DATA,
		CLIENT: (s) => s.user,
		CLIENT_DATA: (s) => s.userData,
		USER_AUTHED: (s) => s.user?.aud === 'authenticated',
		IS_ADMIN: (s) => s.userData?.role === 'admin',
		INVITE_CODES: (s) => s.inviteCodes,
		CLIENTS: (s) => s.clients,
		CLIENTS_LOADING: (s) => s.loaders.loadClients,
		USER_NAME: (s) => s.userData?.data?.name || s.user?.email || 'Гость',
		IS_RESIDENT: (s) => s.userData?.role === 'resident',
	},
};
