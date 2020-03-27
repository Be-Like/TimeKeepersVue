const state = {
  isAuthenticated: false
}

const mutations = {
  setAuthentication(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  }
}

export default {
  state,
  mutations
}
