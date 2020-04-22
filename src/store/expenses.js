import { getExpenses } from '../REST/expenses'

const namespaced = true

const state = {
  expenseArray: [],
  selectedExpense: null
}

const mutations = {
  setExpenseArray(state, expenseArray) {
    state.expenseArray = expenseArray
  }
}

const actions = {
  async getExpenses({ commit }) {
    const res = await getExpenses()
    commit('setExpenseArray', res)
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
