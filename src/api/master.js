import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/craftsmanlist',
    method: 'post',
    data
  })
}

export function getDetails(params) {
  return request({
    url: '/admin/craftsmaninfo',
    method: 'get',
    params
  })
}

export function craftsmanexamine(data) {
  return request({
    url: '/admin/craftsmanexamine',
    method: 'post',
    data
  })
}