import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const addJob = async FormData => {
  try {
    const res = await axios.post('/api/jobs', FormData, config)
    return res.data
  } catch (error) {
    const errors = error.response
    console.log(errors)
  }
}

export const editJob = async (jobId, FormData) => {
  try {
    const res = await axios.put(`/api/jobs/${jobId}`, FormData, config)
    return res.data
  } catch (error) {
    const errors = error.response
    console.log(errors)
  }
}

export const getJobs = async () => {
  try {
    const res = await axios.get('/api/jobs')
    return res.data
  } catch (error) {
    const errors = error.response
    console.log(errors)
  }
}

export const deleteJob = async jobId => {
  try {
    const res = await axios.delete(`/api/jobs/${jobId}`)
    return res.data
  } catch (error) {
    const errors = error.response
    console.log(errors)
  }
}
