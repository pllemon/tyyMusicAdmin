import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/admin/servertypelist?page=${data.page}&limit=${data.limit}`,
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

export function updateRecord(data, type) {
  let url = '/admin/addservertype'
  if (type == 2) {
    url = '/admin/saveservertype'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}



export function updateServertype(data) {
  return request({
    url: '/admin/saveservertype',
    method: 'post',
    data
  })
}