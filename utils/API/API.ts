import { createClient } from '@supabase/supabase-js';
import getUniqueCode from './getUniqueCode.js';
import checkUserStructure from './checkUserStructure.js';

import type { AuthSession, AuthError } from '@supabase/supabase-js';

interface RegistrationResponse {
  user: AuthSession;
  error?: AuthError;
}

const config = {
  DB: {
    usersData: 'users_data',
    inviteCodes: 'invite_codes',
  },
};

const defaultCallback = (...a: any) => console.log(a);

class _API {
  client: any;
  apiList: string[] = [];

  constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_KEY);

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
  }
  updateClientData(client: any) {
    delete client.oldData;

    return this.client
      .from(config.DB.usersData)
      .update(client)
      .match({ user_id: client.user_id });
  }
  async autoAuth() {
    const { data } = await this.client.auth.refreshSession();

    console.log('data?.user', data?.user);

    return data?.user;
  }
  login(email: string, password: string) {
    //console.log(`[API.js > login]: email ${email}, password ${password}`);
    console.log('this.client', this.client);
    return this.client.auth.signInWithPassword({ email, password });
  }

  logout() {
    return this.client.auth.signOut();
    // localStorage.removeItem('supabase.auth.token');
    // location.reload();
  }
  async register({
    email = '',
    password = '',
    role = 'client',
    name = '',
    phone = '',
    inviteCode = '',
    checkCode = true,
  }): Promise<AuthSession | AuthError> {
    if (!inviteCode) {
      return {
        message: 'Invite code is required',
        status: 422,
      } as AuthError;
    }

    const signUpData = {
      email,
      password,
      options: {
        data: {
          code: inviteCode,
          role,
          name,
          phone,
        },
      },
    };

    console.log('signUpData', signUpData);

    return new Promise((resolve, reject) => {
      this.client.auth
        .signUp(signUpData)
        .then((res: RegistrationResponse) => {
          console.log('register -> res', res);

          if (res.error?.status === 429) {
            reject({
              status: 429,
              timeleft: res.error.message.replace(/[^\d]*/gi, ''),
            });
            return;
          }

          resolve(res);
        })
        .catch(reject);
      // if (role === 'resident' && checkCode) {
      //   return this.checkInviteCode(inviteCode, (rez) => {
      //     if (rez) {

      //     } else {
      //       reject({
      //         status: 403,
      //         ok: false,
      //         msg: 'invalid code',
      //         rez,
      //       });
      //     }
      //   }).catch((err) => {
      //     console.error('generateInviteCode:2', err);
      //   });
      // } else {
      //   this.client.auth
      //     .signUp(signUpData, signUpAdds)
      //     .then(resolve)
      //     .catch(reject);
      // }
    });

    // return this.client.auth.signUp(signUpData, signUpAdds);
  }
  // insertUserToUsersDataTabble(user) {
  //   return new Promise((resolve, reject) => {
  //     if (!checkUserStructure(user))
  //       reject({ msg: 'uncurrect user structure', user });

  //     this.client
  //       .from(config.DB.usersData)
  //       .insert([user])
  //       .then((res) => {
  //         // console.log('insertUserToUsersDataTabble: res', res);
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         console.log({
  //           location: 'insertUserToUsersDataTabble error',
  //           err,
  //           user,
  //         });
  //       });
  //   });
  // }
  async getUserData() {
    const { data } = await this.client.auth.getSession();
    const userId = data.session.user.id;

    if (data) {
      return this.client
        .from(config.DB.usersData)
        .select('*')
        .eq('user_id', userId);
    }
  }
  getClient(log: boolean) {
    if (log) console.log(this.client);
    return new Promise((r) => r(this.client));
  }
  generateInviteCode(comment: string) {
    return this.client
      .from(config.DB.inviteCodes)
      .select('*')
      .then((data: { data: string[] }) => {
        const res = data.data;
        const code: string = getUniqueCode(res);

        return this.client
          .from(config.DB.inviteCodes)
          .insert([{ code, comment }])
          .then((res: any) => ({ ...res, code, comment }))
          .catch((err: any) => {
            console.log('generateInviteCode:1', err);
          });
      })
      .catch((err: any) => {
        console.error('generateInviteCode:2', err);
      });
  }
  checkInviteCode(code: string, callback = defaultCallback) {
    return this.client
      .rpc('check_invite_code', {
        input_code: code,
      })
      .then((res: { data: boolean }) => callback(!!res.data))
      .catch((err: any) => {
        console.log('not ok', err);
      });
  }
  removeInviteCode(code: string) {
    return this.client.from(config.DB.inviteCodes).delete('*').eq('code', code);
  }
  loadInviteCodes() {
    console.log('loadInviteCodes');

    return this.client.from(config.DB.inviteCodes).select('*');
  }
  removeCode(code: string) {
    return this.client.from(config.DB.inviteCodes).delete().eq('code', code);
  }
  loadClients() {
    return this.client.from(config.DB.usersData).select('*');
    //.eq('role', 'resident');
  }
}

const API = new _API();

export { API };

export default API;
