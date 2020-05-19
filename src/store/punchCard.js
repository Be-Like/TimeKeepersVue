import {
  getPunchCard,
  clockIn,
  clockOut,
  setBreakTimes
} from '../REST/punchCard'

const namespaced = true

const state = {
  selectedJob: '',
  punchCard: null
}

const mutations = {
  setPunchCard(state, punchCard) {
    state.punchCard = punchCard
  },
  setSelectedJob(state, selectedJob) {
    state.selectedJob = selectedJob
  }
}

const actions = {
  async getPunchCard({ commit }) {
    const res = await getPunchCard()
    commit('setPunchCard', res[0])
    commit('setSelectedJob', res[0].job)
  },
  async clockIn({ commit }, jobId) {
    const res = await clockIn(jobId)
    if (res.errors) {
      console.log('Clock in: ', res)
      alert('There was an issue clocking in')
      return
    }
    commit('setPunchCard', res)
  },
  async clockOut({ commit, state }) {
    let punchCard = state.punchCard
    commit('setPunchCard', null)
    const res = await clockOut(punchCard)
    if (res.errors) {
      commit('setPunchCard', punchCard)
      alert('There was an error connecting to the server')
    }
    // TODO: add newly created job entry to jobEntriesArray
  },
  async beginBreak({ commit, state }) {
    let punchCard = state.punchCard
    let breakTimes = punchCard.breakTimes
    breakTimes.push({startTime: new Date(), endTime: null})
    const res = await setBreakTimes(punchCard._id, breakTimes)
    if (res.errors) {
      console.log('Break Errors:', res.errors)
      alert('There was an error connecting to the server')
      return
    }
    punchCard.breakTimes = breakTimes
    commit('setPunchCard', punchCard)
  },
  async endBreak({ commit, state }) {
    let punchCard = state.punchCard
    let breakTimes = punchCard.breakTimes
    breakTimes[breakTimes.length - 1].endTime = new Date()
    const res = await setBreakTimes(punchCard._id, breakTimes)
    if (res.errors) {
      console.log('Break Errors:', res.errors)
      alert('There was an error connecting to the server')
      return
    }
    punchCard.breakTimes = breakTimes
    commit('setPunchCard', punchCard)
  }
}

const getters = {}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
