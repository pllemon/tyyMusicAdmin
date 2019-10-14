import { constantRoutes } from '@/router'
import { mainAdminRoutes, branchAdminRoutes, testAdminRoutes } from '@/utils/role'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    console.log('______')
    console.log(roles)
    console.log('______')
    return new Promise(resolve => {
      let accessedRoutes = []
      if (roles == 1) {
        accessedRoutes = mainAdminRoutes
      } else if (roles == 2) {
        accessedRoutes = branchAdminRoutes
      } else if (roles == 3) {
        accessedRoutes = testAdminRoutes
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
