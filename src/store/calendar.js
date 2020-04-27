const namespaced = true

const state = {
  selectedDate: new Date()
}

const mutations = {
  setSelectedDate(state, date) {
    state.selectedDate = date
  },
  resetState(state) {
    state.selectedDate = new Date()
  }
}

export default {
  namespaced,
  state,
  mutations
}
