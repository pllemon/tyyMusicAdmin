import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/admin/craftsmanlist?page=${data.page}&limit=${data.limit}`,
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

export function craftsmansettlementlist(data) {
  return request({
    url: `/admin/craftsmansettlementlist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

export function craftsmansettlement(data) {
  return request({
    url: '/admin/craftsmansettlement',
    method: 'post',
    data
  })
}