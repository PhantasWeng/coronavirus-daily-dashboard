import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request'
// import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries: []
  },
  getters: {
    countries: (state) => {
      return state.countries
    }
  },
  mutations: {
    SET_COUNTRIES: function (state, payload) {
      state.countries = payload
    }
  },
  actions: {
    getCountriesList: function ({ commit }) {
      return request({
        url: 'https://restcountries.eu/rest/v2/all',
        method: 'get'
      }).then(res => {
        commit('SET_COUNTRIES', res)
        return res
      })
    },
    getByCountry: function ({ commit, state }, country = 'TWN') {
      return request({
        url: `country/${country}`,
        method: 'get'
      })
    }
  },
  modules: {
  }
})
