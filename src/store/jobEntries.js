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
  addEntryToArray(state, entry) {
    state.jobEntriesArray.push(entry)
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
    const res = await addJobEntry(formData)
    if (res.errors) {
      alert('There was an error connecting with the server. Please try again.')
      return
    }
    commit('addEntryToArray', formData)
    commit('setShowAddEntryModal', false)
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
