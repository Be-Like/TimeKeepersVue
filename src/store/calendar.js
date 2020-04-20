const namespaced = true

const state = {
  selectedDate: new Date()
}

const mutations = {
  setSelectedDate(state, date) {
    state.selectedDate = date
  }
}

export default {
  namespaced,
  state,
  mutations
}
