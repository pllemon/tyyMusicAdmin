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
    return new Promise(resolve => {
      let accessedRoutes = []
      if (roles == 1) { // 总部管理员
        accessedRoutes = mainAdminRoutes
      } else if (roles == 2) { // 分部管理员
        accessedRoutes = branchAdminRoutes
      } else if (roles == 3) { // 测试账号
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
