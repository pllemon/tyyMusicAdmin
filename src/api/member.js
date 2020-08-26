import request from '@/utils/request'

export function getList(data) {
  return request({
    url: `/admin/userlist?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}

export function getDetails(data) {
  return request({
    url: '/admin/userinfo',
    method: 'post',
    data
  })
}

export function craftsmanexamine(data) {
  return request({
    url: '/admin/craftsmanexamine',
    method: 'post',
    data
  })
}

export function getFeedbackList(data) {
  return request({
    url: '/admin/feedbacklist',
    method: 'post',
    data
  })
}


export function userintegrallist(data) {
  return request({
    url: '/admin/userintegrallist',
    method: 'post',
    data
  })
}

export function senuserintegral(data) {
  return request({
    url: '/admin/senuserintegral',
    method: 'post',
    data
  })
}

// 用户受益列表
export function userprofit(data) {
  return request({
    url: '/admin/userprofit',
    method: 'post',
    data
  })
}

// 用户提现审核
export function examinewithdrawa(data) {
  return request({
    url: '/admin/examinewithdrawa',
    method: 'post',
    data
  })
}

// 用户申请提现列表
export function userwithdrawallist(data) {
  return request({
    url: '/admin/userwithdrawallist',
    method: 'post',
    data
  })
}