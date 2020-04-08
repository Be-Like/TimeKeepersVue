import { getJobs } from '../REST/job'

const state = {
  jobsArray: [],
  showJobModal: false,
  selectedJob: null
}

const mutations = {
  addJobToArray(state, job) {
    state.jobsArray.push(job)
  },
  setJobsArray(state, jobsArray) {
    state.jobsArray = jobsArray
  },
  setShowJobModal(state, showJobModal) {
    state.showJobModal = showJobModal
  },
  setSelectedJob(state, selectedJob) {
    console.log('Selected Job: ', selectedJob)
    state.selectedJob = selectedJob
  }
}

const actions = {
  async getJobs({ commit }) {
    const res = await getJobs()
    console.log(res) // TODO: remove when complete
    commit('setJobsArray', res)
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
