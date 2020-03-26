import axios from 'axios'

export const register = async ({ name, email, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post('/api/register', body, config)

    console.log(res)
  } catch (error) {
    console.log(error.repsonse.data.errors)
  }
}
