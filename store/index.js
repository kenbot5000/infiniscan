export const state = () => ({
  user: ''
});

export const mutations = ({
  setUser (state, id) {
    state.user = id;
  }
});
