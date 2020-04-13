import { addJob, editJob, getJobs, deleteJob } from '../REST/job'

const state = {
  jobsArray: [],
  showAddJobModal: false,
  showEditJobModal: false,
  selectedJob: null
}

const mutations = {
  addJobToArray(state, job) {
    state.jobsArray.push(job)
    state.selectedJob = job
  },
  editJobInArray(state, job) {
    state.selectedJob = job
    const index = state.jobsArray.map(x => {return x._id}).indexOf(job._id)
    state.jobsArray.splice(index, 1, job)
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
  setShowAddJobModal(state, showAddJobModal) {
    state.showAddJobModal = showAddJobModal
  },
  setShowEditJobModal(state, showEditJobModal) {
    state.showEditJobModal = showEditJobModal
  },
  setSelectedJob(state, selectedJob) {
    console.log('Selected Job: ', selectedJob)
    state.selectedJob = selectedJob
  }
}

const actions = {
  async addJob({ commit }, formData) {
    const res = await addJob(formData)
    if (res.errors) {
      console.log('Error creating job:', res.errors)
    } else {
      commit('addJobToArray', res)
      commit('setShowAddJobModal', false)
    }
  },
  async editJob({ commit }, job) {
    const res = await editJob(job._id, job)
    if (res.errors) {
      alert('There were errors editing the job. Please try again')
    } else {
      commit('editJobInArray', res)
      commit('setShowEditJobModal', false)
    }
  },
  async getJobs({ commit }) {
    const res = await getJobs()
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
