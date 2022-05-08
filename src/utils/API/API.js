import { createClient } from '@supabase/supabase-js';
import getUniqueCode from './getUniqueCode.js';
import checkUserStructure from './checkUserStructure.js';

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

    this.login.bind(this);
    this.logout.bind(this);
    this.autoAuth.bind(this);
    this.register.bind(this);
    this.getClient.bind(this);
    this.removeCode.bind(this);
    this.getUserData.bind(this);
    this.loadClients.bind(this);
    this.checkInviteCode.bind(this);
    this.loadInviteCodes.bind(this);
    this.updateClientData.bind(this);
    this.generateInviteCode.bind(this);

    this.apiList = [
      'login',
      'logout',
      'autoAuth',
      'register',
      'getClient',
      'removeCode',
      'getUserData',
      'loadClients',
      'checkInviteCode',
      'loadInviteCodes',
      'updateClientData',
      'generateInviteCode',
    ];
  }
  updateClientData(client) {
    delete client.oldData;

    return this.client
      .from(config.DB.usersData)
      .update(client)
      .match({ user_id: client.user_id });
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
              .then((res) => {
                console.log('register -> res', res);

                if (res.status === 429) {
                  reject({
                    status: 429,
                    timeleft: res.error.message.replace(
                      /For security purposes, you can only request this after | seconds\./g,
                      ''
                    ),
                  });
                  return;
                }

                this.removeInviteCode(inviteCode);
                resolve(res);
              })
              .catch(reject);
          } else {
            reject({
              status: 403,
              ok: false,
              msg: 'unvalide code',
              rez,
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
  insertUserToUsersDataTabble(user) {
    return new Promise((resolve, reject) => {
      if (!checkUserStructure(user))
        reject({ msg: 'uncurrect user structure', user });

      this.client
        .from(config.DB.usersData)
        .insert([user])
        .then((res) => {
          console.log('insertUserToUsersDataTabble: res', res);
          resolve(res);
        })
        .catch((err) => {
          console.log({
            location: 'insertUserToUsersDataTabble error',
            err,
            user,
          });
        });
    });
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
        callback(res.data !== null && res.data.length > 0);
      })
      .catch((err) => {
        console.log('not ok', err);
      });
  }
  removeInviteCode(code) {
    return this.client.from(config.DB.inviteCodes).delete('*').eq('code', code);
  }
  loadInviteCodes() {
    return this.client.from(config.DB.inviteCodes).select('*');
  }
  removeCode(code) {
    return this.client.from(config.DB.inviteCodes).delete().eq('code', code);
  }
  loadClients() {
    return this.client.from(config.DB.usersData).select('*');
    //.eq('role', 'resident');
  }
}

const API = new _API();

export { API };

export default _API;
