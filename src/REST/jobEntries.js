/* eslint-disable no-unused-vars */
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const getJobEntries = async () => {
  try {
    const jobEntries = await axios.get('/api/job-entry')

    let jobIds = []
    jobEntries.data.forEach(entry => {
      jobIds.push(entry.job)
    })

    let uniqueJobIds = Array.from(new Set(jobIds))
    for (const id of uniqueJobIds) {
      let job = await axios.get(`/api/jobs/${id}`)
      jobEntries.data.forEach(entry => {
        if (entry.job == id) {
          entry.company = job.data.company
          entry.jobTitle = job.data.jobTitle
        }
      })
    }

    return jobEntries.data
  } catch (error) {
    const errors = error.response
    console.log(errors)
  }
}

export const addJobEntry = async FormData => {
  try {
    let breakTime = 0
    FormData.breakTimes.forEach(time => {
      breakTime += (time.endTime.getTime() - time.startTime.getTime())
    })
    let hours =
      (FormData.endTime.getTime() - FormData.startTime.getTime()) - (breakTime)

    FormData.hoursWorked = hours / (1000 * 60 * 60)
    FormData.pay = FormData.pay * FormData.hoursWorked

    const jobEntry = await axios.post('/api/job-entry', FormData, config)
    return jobEntry.data
  } catch (error) {
    const errors = error.response
    return { errors: errors }
  }
}

export const editJobEntry = async (entryId, FormData) => {
  try {
    let breakTime = 0
    FormData.breakTimes.forEach(time => {
      breakTime += (time.endTime.getTime() - time.startTime.getTime())
    })
    let hours =
      (FormData.endTime.getTime() - FormData.startTime.getTime()) - (breakTime)

    FormData.hoursWorked = hours / (1000 * 60 * 60)
    FormData.pay = FormData.pay * FormData.hoursWorked

    console.log('Entry id', entryId)

    const res = await axios.put(`/api/job-entry/${entryId}`, FormData, config)
    return res.data
  } catch (error) {
    const errors = error.response
    return { errors: errors}
  }
}

export const deleteJobEntry = async entryId => {
  try {
    const res = await axios.delete(`/api/job-entry/${entryId}`)
    return res.data
  } catch (error) {
    const errors = error.response
    return { errors: errors }
  }
}
