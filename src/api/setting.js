import request from '@/utils/request'

export function setdoc(data) {
  return request({
    url: '/admin/setdoc',
    method: 'post',
    data
  })
}

export function getdoc(data) {
  return request({
    url: '/admin/getdoc',
    method: 'post',
    data
  })
}