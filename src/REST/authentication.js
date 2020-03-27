import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const register = async ({ name, email, password }) => {
  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post('/api/register', body, config)
    return res.data
  } catch (error) {
    const errors = error.response.data
    return errors
  }
}

export const login = async ({ email, password }) => {
  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/login', body, config)
    return res.data
  } catch (error) {
    const errors = error.response.data
    return errors
  }
}
