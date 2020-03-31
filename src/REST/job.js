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
