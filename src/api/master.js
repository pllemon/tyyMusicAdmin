import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/admin/craftsmanlist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

export function craftsmanorderlist(data) {
  return request({
    url: `/admin/craftsmanorderlist?page=${data.page}&limit=${data.limit}`,
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

// 申请列表
export function craftsmansettlementlist(data) {
  return request({
    url: `/admin/craftsmansettlementlist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

// 申请详情
export function craftsmansettlementinfo(data) {
  return request({
    url: `/admin/craftsmansettlementinfo`,
    method: 'post',
    data
  })
}

// 审核和结算
export function craftsmansettlement(data) {
  return request({
    url: '/admin/craftsmansettlement',
    method: 'post',
    data
  })
}

export function savecraftsmanstatus(data) {
  return request({
    url: '/admin/savecraftsmanstatus',
    method: 'post',
    data
  })
}


export function savecraftsmaninfo(data) {
  return request({
    url: '/admin/savecraftsmaninfo',
    method: 'post',
    data
  })
}