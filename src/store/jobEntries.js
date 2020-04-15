/* eslint-disable no-unused-vars */
import { getJobEntries, addJobEntry } from '../REST/jobEntries'

const namespaced = true

const state = {
  jobEntriesArray: [],
  showAddEntryModal: false,
  showEditEntryModal: false,
  selectedJobEntry: null
}

const mutations = {
  setJobEntriesArray(state, entries) {
    state.jobEntriesArray = entries
  },
  setShowAddEntryModal(state, show) {
    state.showAddEntryModal = show
  },
  setShowEditEntryModal(state, show) {
    state.showEditEntryModal = show
  }
}

const actions = {
  async getJobEntries({ commit }) {
    const res = await getJobEntries()
    commit('setJobEntriesArray', res)
  },
  async addJobEntry({ commit }, formData) {
    // Add job entry via REST api
    const res = await addJobEntry(formData)
    console.log('Add Entry Response', res)
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
  getters,
  namespaced
}
