import axios from 'axios'

export const getExpenses = async () => {
  try {
    const expenses = await axios.get('/api/expenses')
    return expenses.data
  } catch (error) {
    const errors = error.response
    return { errors: errors}
  }
}
