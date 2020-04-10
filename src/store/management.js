/* eslint-disable no-unused-vars */
import { getJobs, deleteJob } from '../REST/job'

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
  removeDeletedJob(state, jobId) {
    let index = state.jobsArray.map(x => {return x._id}).indexOf(jobId)
    if (state.jobsArray[index]._id == jobId) {
      state.selectedJob = null
    }
    state.jobsArray.splice(index, 1)
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
  },
  async deleteJob({ commit }, jobId) {
    const res = await deleteJob(jobId)
    if (res.errors) {
      alert('There was an error deleting the job. Please try again')
    } else {
      commit('removeDeletedJob', jobId)
    }
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
