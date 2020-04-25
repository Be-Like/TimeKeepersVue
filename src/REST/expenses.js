import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const getExpenses = async () => {
  try {
    const expenses = await axios.get('/api/expenses')

    let jobIds = []
    expenses.data.forEach(expense => {
      jobIds.push(expense.job)
    })

    let uniqueJobIds = Array.from(new Set(jobIds))
    for (const id of uniqueJobIds) {
      let job = await axios.get(`/api/jobs/${id}`)
      expenses.data.forEach(expense => {
        if (expense.job == id) {
          expense.company =job.data.company
          expense.jobTitle =job.data.jobTitle
        }
      })
    }

    return expenses.data
  } catch (error) {
    const errors = error.response
    return { errors: errors}
  }
}

export const addExpense = async FormData => {
  try {
    const res = await axios.post('/api/expenses', FormData, config)
    return res.data
  } catch (error) {
    const errors = error.response
    return { errors: errors }
  }
}

export const editExpense = async (expenseId, FormData) => {
  try {
    const res = await axios.put(`/api/expenses/${expenseId}`, FormData, config)
    return res.data
  } catch (error) {
    return { errors: error.response }
  }
}

export const deleteExpense = async expenseId => {
  try {
    const res = await axios.delete(`/api/expenses/${expenseId}`)
    return res.data
  } catch (error) {
    return { errors: error.response}
  }
}
