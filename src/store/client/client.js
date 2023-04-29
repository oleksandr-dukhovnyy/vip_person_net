export default {
  namespaced: true,
  state: {
    name: '',
    email: '',
    depo: 0,
  },
  getters: {
    AUTHED: (s) => true,
    NAME: (s) => s.name,
    EMAIL: (s) => s.email,
    DEPO: (s) => s.depo,
  },
};
