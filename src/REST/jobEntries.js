import axios from 'axios'

// const config = {
//   headers: {
//     'Content-Type': 'application/json'
//   }
// }

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
