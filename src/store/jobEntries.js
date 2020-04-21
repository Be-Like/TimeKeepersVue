import { getJobEntries, addJobEntry, editJobEntry, deleteJobEntry } from '../REST/jobEntries'

const namespaced = true

const state = {
  jobEntriesArray: [],
  selectedJobEntry: null
}

const mutations = {
  setJobEntriesArray(state, entries) {
    state.jobEntriesArray = entries
  },
  addEntryToArray(state, entry) {
    state.jobEntriesArray.push(entry)
  },
  editJobEntryInArray(state, entry) {
    state.selectedJobEntry = entry
    const index = state.jobEntriesArray.map(x=> {return x._id}).indexOf(entry._id)
    state.jobEntriesArray.splice(index, 1, entry)
  },
  removeEntryFromArray(state, entryId) {
    let index = state.jobEntriesArray.map(x => {return x._id}).indexOf(entryId)
    if (state.jobEntriesArray[index]._id === entryId) {
      state.selectedJobEntry = null
    }
    state.jobEntriesArray.splice(index, 1)
  },
  setSelectedJobEntry(state, entry) {
    state.selectedJobEntry = entry
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
  },
  async editJobEntry({ commit }, entry) {
    console.log('Entry', entry)
    const res = await editJobEntry(entry._id, entry)
    if (res.errors) {
      console.log('Errors:', res.errors)
      alert('There was an error connecting with the server. Please try again.')
      return
    }
    commit('editJobEntryInArray', entry)
  },
  async deleteJobEntry({ commit }, entryId) {
    const res = await deleteJobEntry(entryId)
    if (res.errors) {
      alert('There was an error connecting with the server. Please try again.')
      return
    }
    commit('removeEntryFromArray', entryId)
  }
}

const getters = {
  getJobEntriesArray: state => {
    return state.jobEntriesArray
  },
  getJobEntriesByDate: state => date => {
    date.setHours(0, 0, 0, 0)
    date = date.getTime()

    let allEntries = state.jobEntriesArray
    let entries = []

    allEntries.forEach(entry => {
      let startTime = new Date(entry.startTime)
      let endTime = new Date(entry.endTime)
      startTime.setHours(0, 0, 0, 0)
      endTime.setHours(0, 0, 0, 0)
      startTime = startTime.getTime()
      endTime = endTime.getTime()
      if (date === startTime || date === endTime) {
        entries.push(entry)
      }
    })

    return entries
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced
}
