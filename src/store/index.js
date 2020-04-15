import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request'
import dayjs from 'dayjs'
import i18n from '@/i18n'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries: [],
    langs: [
      {
        name: 'English',
        key: 'en-US'
      },
      {
        name: '繁體中文',
        key: 'zh-TW'
      }
    ]
  },
  getters: {
    langs: (state) => {
      return {
        list: state.langs,
        selectedLang: _.find(state.langs, lang => {
          return lang.key === i18n.locale
        })
      }
    },
    countries: (state) => {
      return state.countries
    }
  },
  mutations: {
    SET_LANGUAGE: function (state, payload) {
      i18n.locale = payload.key
    },
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
        url: `country/${country}?${dayjs().format('YYYY-MM-DD-mm-ss')}`,
        headers: {
          'Cache-Control': 'no-cache'
        },
        method: 'get'
      })
    }
  },
  modules: {
  }
})
