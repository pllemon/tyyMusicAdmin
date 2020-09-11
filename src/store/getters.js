const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  globalSearch: state => state.user.globalSearch,
  permission_routes: state => state.permission.routes,
  newList: state => state.news.list,
  isRing: state => state.news.isRing,
}
export default getters
