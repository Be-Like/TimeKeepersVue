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

export const clockOut = async punchCard => {
  try {
    let body = JSON.stringify({
      endTime: new Date(),
      breakTimes: punchCard.breakTimes
    })
    const res = await axios.put(
      `/api/punch-card/clock-out/${punchCard._id}`,
      body,
      config
    )

    return res.data
  } catch (error) {
    const errors = error.response
    return { errors: errors }
  }
}

export const setBreakTimes = async (punchCardId, breakTimes) => {
  try {
    const res = await axios.put(
      `/api/punch-card/break/${punchCardId}`,
      { breakTimes },
      config
    )
    return res.data
  } catch (error) {
    const errors = error.response
    return { errors: errors }
  }
}
