import { getExpenses, addExpense } from '../REST/expenses'

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
  setSelectedExpense(state, expense) {
    state.selectedExpense = expense
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
    commit('addExpenseToArray', res)
    commit('setSelectedExpense', res)
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
