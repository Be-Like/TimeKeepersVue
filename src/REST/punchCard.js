import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const getPunchCard = async () => {
  try {
    const punchCard = await axios.get('/api/punch-card')
    return punchCard.data
  } catch (error) {
    const errors = error.response
    return { errors: errors }
  }
}

export const clockIn = async jobId => {
  try {
    const res = await axios.post(
      `/api/punch-card`,
      { job: jobId },
      config
    )

    return res.data
  } catch (error) {
    const errors = error.response
    return { errors: errors }
  }
}

export const clockOut = async punchCardId => {
  try {
    const res = await axios.put(
      `/api/punch-card/${punchCardId}`,
      {endTime: new Date()},
      config
    )

    return res.data
  } catch (error) {
    const errors = error.response
    return { errors: errors }
  }
}
