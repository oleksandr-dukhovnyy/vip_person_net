import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth/auth.js';
import actions from './master/actions.js';

Vue.use(Vuex);

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
