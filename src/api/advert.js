import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/bannerlist',
    method: 'post',
    data
  })
}

export function getDetails(params) {
  return request({
    url: '/admin/bannerinfo',
    method: 'get',
    params
  })
}

export function updateRecord(data) {
  let url = '/admin/addbanner'
  if (data.id) {
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