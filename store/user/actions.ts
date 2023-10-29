import authAPI from '~/API/auth';
import userAPI from '~/API/user';

const loadClientActions = () => {
  return 1;
};

const setClient = (
  commit: (key: keyof User.Store.Mutations, payload: any) => void,
  client: User.User,
  name: string,
  actions: User.ActionsList,
  deposit: User.Deposit
) => {
  commit('SET_NAME', client.name);
  commit('SET_EMAIL', client.email);
  commit('SET_DEPOSIT', deposit);
  commit('SET_ACTIONS', actions);
};

export default <User.Store.Actions>{
  async AUTO_AUTHENTICATE({ commit }) {
    const session = await authAPI.AUTO_AUTH();

    if (session.data?.email) {
      commit('SET_NAME', session.data.user_metadata.name);
      commit('SET_EMAIL', session.data.email);
    }

    return session.ok;
  },
  async LOAD_CLIENT_DATA({ commit }) {
    const userData = await userAPI.LOAD_USER_DATA();

    console.log({
      userData,
    });
  },
  async LOGIN(api: any, email: string, password: string) {
    return false;
  },
};
