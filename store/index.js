import Vuex from 'vuex';

import auth from './auth/auth.js';
import actions from './master/actions.js';

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  // getters
  modules: {
    auth,
    actions,
  },
});
