export default () => ({
  user: {},
  userData: null,
  loaders: {
    login: false,
    register: false,
    loadClients: false,
    SAVE_USER_DATA: false,
  },
  errors: {
    login: null,
    register: null,
  },
  clients: [],
  oldData: '',
  inviteCodes: [],
});
