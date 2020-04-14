import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import management from './management'
import jobEntries from './jobEntries'

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
    jobEntries
  }
})
