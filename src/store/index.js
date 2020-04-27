import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import management from './management'
import jobEntries from './jobEntries'
import expenses from './expenses'
import calendar from './calendar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    resetState({ commit }) {
      commit('calendar/resetState')
      commit('expenses/resetState')
      commit('jobEntries/resetState')
      commit('management/resetState')
    }
  },
  modules: {
    auth,
    management,
    jobEntries,
    expenses,
    calendar
  }
})
