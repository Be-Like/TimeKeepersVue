import { getJobEntries } from '../REST/jobEntries'

const state = {
  jobEntriesArray: []
}

const mutations = {
  setJobEntriesArray(state, entries) {
    state.jobEntriesArray = entries
  }
}

const actions = {
  async getJobEntries({ commit }) {
    const res = await getJobEntries()
    commit('setJobEntriesArray', res)
  }
}

const getters = {
  getJobEntriesArray: state => {
    return state.jobEntriesArray
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
