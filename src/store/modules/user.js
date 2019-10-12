import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setLoginStorage, removeLoginStorage } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  roles: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password, remember } = userInfo
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        if (remember) {
          setLoginStorage(userInfo)
        } else {
          removeLoginStorage()
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 个人信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data)

        if (!data) {
          reject('登录已过期，请重新登录')
        }

        data.roles = 1

        // 改这role
        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', null)
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // 清除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', null)
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

