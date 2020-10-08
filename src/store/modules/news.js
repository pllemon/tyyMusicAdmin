
import Vue from 'vue'
import moment from 'moment'

let list = {}
let dsfNews = sessionStorage.getItem('dsfNews')
if (dsfNews) {
  list = JSON.parse(dsfNews)
}
console.log(list)

const state = {
  list: list,
  hasSocket: false,
  isRing: false
}

const mutations = {
  setSocket(state, data) {
    state.hasSocket = data
  },
  setRing(state, data) {
    state.isRing = data
  },

  ADD_NEWS: (state, news) => {
    let type = news.type
    if (!state.list[type]) {
      Vue.set(state.list, type, [])
    }
    let message = JSON.parse(news.message)
    message.addTime = moment().format('YYYY-MM-DD HH:mm:ss')
    state.list[type].push(message)
    sessionStorage.setItem('dsfNews', JSON.stringify(state.list))
    state.isRing = true
  },
  REMOVE_NEWS: (state, type) => {
    state.list[type] = []
    sessionStorage.setItem('dsfNews', JSON.stringify(state.list))
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

