import API from '@/utils/API/API.js';
import { AppRouter } from '@/main';

let client = new API();

// function auth() {
// 	const api = new API();

// 	api.connect(() => {
// 		// console.log('api', api);

// 		// api
// 		// 	.login()
// 		// 	.then(() => {
// 		// 		const rez = api.getUserData();
// 		// 		console.log('rez', rez);

// 		// 	});

// 		const rez = api.getUserData().then((r) => console.log(r.data?.length));
// 		console.log('rez getUserData', rez);
// 	});
// }

export default {
	actions: {
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
		LOGIN({ commit, getters }, { email, password, next = 'cabinet' }) {
			if (!getters.USER_AUTHED) {
				commit('SET_LOADER', { loaderName: 'login' });
				client
					.login(email, password)
					.then((res) => {
						commit('SET_USER_DATA', res?.data[0]);
						commit('SET_LOADER', {
							loaderName: 'login',
							loaderCondition: false,
						});

						AppRouter.push({ name: next });

						client = new API();
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
			state.clients = arr;
		},
	},
	state: {
		userData: null,
		loaders: {
			login: false,
			register: false,
			loadClients: false,
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
		CLIENT: (s) => s.userData,
		USER_AUTHED: (s) => s.userData !== null && s.userData !== undefined,
		IS_ADMIN: () => client.client?.auth?.currentUser?.role === 'supabase_admin',
		INVITE_CODES: (s) => s.inviteCodes,
		CLIENTS: (s) => s.clients,
		CLIENTS_LOADING: (s) => s.loaders.loadClients,
	},
};
