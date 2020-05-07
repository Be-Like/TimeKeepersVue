import { getPunchCard, clockIn, clockOut } from '../REST/punchCard'

const namespaced = true

const state = {
  punchCard: null
}

const mutations = {
  setPunchCard(state, punchCard) {
    state.punchCard = punchCard
  }
}

const actions = {
  async getPunchCard({ commit }) {
    const res = await getPunchCard()
    commit('setPunchCard', res[0])
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
    const res = await clockOut(punchCard._id)
    if (res.errors) {
      commit('setPunchCard', punchCard)
      alert('There was an error connecting to the server')
    }
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
