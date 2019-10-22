const state = {
  list: [1,2,3]
}

const mutations = {
  ADD_NEWS: (state, news) => {
    state.list.push(news)
  },
  REMOVE_NEWS: (state, idx) => {
    state.list.splice(idx, 1)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

