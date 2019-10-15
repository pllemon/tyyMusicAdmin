import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/admin/businesslist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}


export function businessinfo(params) {
  return request({
    url: '/admin/businessinfo',
    method: 'get',
    params
  })
}


export function businessexamine(data) {
  return request({
    url: '/admin/businessexamine',
    method: 'post',
    data
  })
}