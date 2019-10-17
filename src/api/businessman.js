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

export function businesscashinlist(data) {
  return request({
    url: `/admin/businesscashinlist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

export function savebusinessdstatus(data) {
  return request({
    url: '/admin/savebusinessdstatus',
    method: 'post',
    data
  })
}