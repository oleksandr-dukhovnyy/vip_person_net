import Vuex from 'vuex';

import auth from './auth/auth.js';
import actions from './master/actions.js';
// import client from './client/index';

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  // getters
  modules: {
    // client,
    auth,
    actions,
  },
});
