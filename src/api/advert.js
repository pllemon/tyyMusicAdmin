import request from '@/utils/request'

export function bannerlist(data) {
  return request({
    url: '/admin/bannerlist',
    method: 'post',
    data
  })
}

export function bannerinfo(params) {
  return request({
    url: '/admin/bannerinfo',
    method: 'get',
    params
  })
}

export function saveinfo(type, data) {
  let url = '/admin/addbanner'
  if (type == 2) {
    url = '/admin/updatebannerinfo'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function updatebannerstatus(data) {
  return request({
    url: '/admin/updatebannerstatus',
    method: 'post',
    data
  })
}