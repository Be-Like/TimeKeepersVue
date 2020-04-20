import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import management from './management'
import jobEntries from './jobEntries'
import calendar from './calendar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    management,
    jobEntries,
    calendar
  }
})
