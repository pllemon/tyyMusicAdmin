const state = {
  list: []
}

const mutations = {
  UPDATE_LIST: (state, list) => {
    state.list = list
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

