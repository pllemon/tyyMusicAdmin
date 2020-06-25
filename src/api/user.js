import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/adminuserinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function workbind(data) {
  return request({
    url: '/admin/workbind',
    method: 'post',
    data: data
  })
}

export function worksend(data) {
  return request({
    url: '/admin/worksend',
    method: 'post',
    data: data
  })
}