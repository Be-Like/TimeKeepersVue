import { getExpenses, addExpense, editExpense, deleteExpense } from '../REST/expenses'

const namespaced = true

const state = {
  expenseArray: [],
  selectedExpense: null
}

const mutations = {
  setExpenseArray(state, expenseArray) {
    state.expenseArray = expenseArray
  },
  addExpenseToArray(state, expense) {
    state.expenseArray.push(expense)
  },
  editExpenseInArray(state, expense) {
    state.selectedExpense = expense
    const index = state.expenseArray.map(x => { return x._id }).indexOf(expense._id)
    state.expenseArray.splice(index, 1, expense)
  },
  removeExpenseFromArray(state, expenseId) {
    let index = state.expenseArray.map(x => { return x._id }).indexOf(expenseId)
    if (state.selectedExpense._id === expenseId) {
      state.selectedExpense = null
    }
    state.expenseArray.splice(index, 1)
  },
  setSelectedExpense(state, expense) {
    state.selectedExpense = expense
  },
  resetState(state) {
    state.expenseArray = [],
    state.selectedExpense = null
  }
}

const actions = {
  async getExpenses({ commit }) {
    const res = await getExpenses()
    commit('setExpenseArray', res)
  },
  async addExpense({ commit }, formData) {
    const res = await addExpense(formData)
    if (res.errors) {
      alert('There was an error adding the expense')
      console.log('Errors', res.errors)
      return
    }
    res.company = formData.company
    res.jobTitle = formData.jobTitle
    commit('addExpenseToArray', res)
    commit('setSelectedExpense', res)
  },
  async editExpense({ commit }, expense) {
    const res = await editExpense(expense._id, expense)
    if (res.errors) {
      alert('There was an error connecting with the server. Please try again.')
      return
    }
    res.company = expense.company
    res.jobTitle = expense.jobTitle
    commit('editExpenseInArray', res)
  },
  async deleteExpense({ commit }, expenseId) {
    const res = await deleteExpense(expenseId)
    if (res.errors) {
      alert('There was an error connecting with the server. Please try again.')
      console.log('Errors', expenseId)
      return
    }
    commit('removeExpenseFromArray', expenseId)
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
