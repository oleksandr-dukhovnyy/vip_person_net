export default <User.Store.Getters>{
  AUTHENTICATED: (state) => state.name !== null,
  NAME: (state) => state.name,
  EMAIL: (state) => state.email,
  DEPOSIT: (state) => state.deposit,
  ACTIONS: (state) => state.actions,
};
