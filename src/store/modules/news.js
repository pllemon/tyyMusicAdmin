
import Vue from 'vue'

let list = {}
let dsfNews = sessionStorage.getItem('dsfNews')
if (dsfNews) {
  list = JSON.parse(dsfNews)
}
console.log(list)

const state = {
  list: list
}

const mutations = {
  ADD_NEWS: (state, news) => {
    let type = news.type
    type = 'newOrder'
    if (!state.list[type]) {
      Vue.set(state.list, type, [])
    }
    state.list[type].push(news)
    sessionStorage.setItem('dsfNews', JSON.stringify(state.list))
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

