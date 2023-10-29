export default <User.Store.Mutations>{
  SET_NAME(state, name) {
    state.name = name;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  SET_DEPOSIT(state, deposit) {
    state.deposit = deposit;
  },
  SET_ACTIONS(state, actions) {
    state.actions = actions;
  },
};
