import { createClient } from '@supabase/supabase-js';
import getUniqueCode from './getUniqueCode.js';

// const testUsers = [
// 	{
// 		email: 'lebitoh943@ehstock.com',
// 		password: 'ZSvWEYGtbbszwDHxdQRx',
// 		id: '07893d2d-c26e-49fb-a67f-8ac61a0e6f8e',
// 	},
// ];

const config = {
	DB: {
		usersData: 'users_data',
		inviteCodes: 'invite_codes',
	},
	SUPABASE_URL: process.env.VUE_APP_SUPABASE_URL,
	SUPABASE_KEY: process.env.VUE_APP_SUPABASE_KEY,
};

const defaultCallback = (...a) => console.log(a);

class _API {
	constructor() {
		this.client = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

		this.autoAuth.bind(this);
		this.login.bind(this);
		this.register.bind(this);
		this.getUserData.bind(this);
		this.getClient.bind(this);
		this.generateInviteCode.bind(this);
		this.checkInviteCode.bind(this);
		this.loadInviteCodes.bind(this);
		this.removeCode.bind(this);
		this.loadClients.bind(this);

		this.apiList = [
			'autoAuth',
			'login',
			'logout',
			'register',
			'getUserData',
			'getClient',
			'generateInviteCode',
			'checkInviteCode',
			'loadInviteCodes',
			'removeCode',
			'loadClients',
		];
		// this.updateUserData.bind(this);
	}
	autoAuth() {
		return new Promise((r) => r(this.client.auth.user()));
	}
	login(email, password) {
		//console.log(`[API.js > login]: email ${email}, password ${password}`);
		return this.client.auth.signIn({ email, password });
	}

	logout() {
		localStorage.removeItem('supabase.auth.token');
		location.reload();
	}
	register({
		email,
		password,
		role = 'client',
		name = '',
		phone = '',
		inviteCode,
		checkCode = true,
	}) {
		const signUpData = {
			email: email,
			password: password,
		};

		const signUpAdds = {
			data: {
				role,
				name,
				phone,
			},
		};

		return new Promise((resolve, reject) => {
			if (role === 'resident' && checkCode) {
				return this.checkInviteCode(inviteCode, (rez) => {
					if (rez) {
						this.client.auth
							.signUp(signUpData, signUpAdds)
							.then(resolve)
							.catch(reject);
					} else {
						reject({
							status: 403,
							ok: false,
							msg: 'unvalide code',
						});
					}
				}).catch((err) => {
					console.error('generateInviteCode:2', err);
				});
				// this.client
				// 	.from(config.DB.inviteCodes)
				// 	.select('*')
				// 	.eq('code', inviteCode)
				// 	.then((res) => {
				// 		if (res.data.length) {
				// 			this.client.auth
				// 				.signUp(signUpData, signUpAdds)
				// 				.then(resolve)
				// 				.catch(reject);
				// 		} else {
				// 			reject({
				// 				status: 403,
				// 				ok: false,
				// 				msg: 'unvalide code',
				// 			});
				// 		}
				// 	})
				// 	.catch(reject);
			} else {
				this.client.auth
					.signUp(signUpData, signUpAdds)
					.then(resolve)
					.catch(reject);
			}
		});

		// return this.client.auth.signUp(signUpData, signUpAdds);
	}
	getUserData() {
		if (this.client.auth.currentSession?.user?.id) {
			return this.client
				.from(config.DB.usersData)
				.select('*')
				.eq('user_id', this.client.auth.currentSession?.user?.id);
		} else {
			return new Promise((_, reject) => {
				reject({
					status: 401,
					ok: false,
				});
			});
		}
	}
	getClient(log) {
		if (log) console.log(this.client);
		return new Promise((r) => r(this.client));
	}
	generateInviteCode(comment) {
		return this.client
			.from(config.DB.inviteCodes)
			.select('*')
			.then((data) => {
				const res = data.data;
				const code = getUniqueCode(res);

				return this.client
					.from(config.DB.inviteCodes)
					.insert([{ code, comment }])
					.then((res) => ({ ...res, code, comment }))
					.catch((err) => {
						console.log('generateInviteCode:1', err);
					});
			})
			.catch((err) => {
				console.error('generateInviteCode:2', err);
			});
	}
	checkInviteCode(code, callback = defaultCallback) {
		return this.client
			.rpc('checkcode', {
				inv_code: code,
			})
			.then((res) => {
				callback(res.data.length > 0);
			})
			.catch((err) => {
				console.log('not ok', err);
			});
	}
	loadInviteCodes() {
		return this.client.from(config.DB.inviteCodes).select('*');
	}
	removeCode(code) {
		return this.client.from(config.DB.inviteCodes).delete().eq('code', code);
	}
	loadClients() {
		return this.client.from(config.DB.usersData).select('*');
	}
}

const API = new _API();

export { API };

export default _API;
