import axios from "axios"

const state = {
  showJobModal: false,
  jobsArray: []
}

const mutations = {
  setShowJobModal(state, showJobModal) {
    state.showJobModal = showJobModal
  },
  setJobsArray(state, jobsArray) {
    state.jobsArray = jobsArray
  }
}

const actions = {
  async getJobs({ commit }) {
    const res = await axios.get('/api/jobs')
    console.log(res.data)
    commit('setJobsArray', res.data)
  }
}

const getters = {
  getJobsArray: state => {
    return state.jobsArray
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
