import Vuex from 'vuex';

import auth from './auth';
import actions from './master';

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    actions,
  },
});
