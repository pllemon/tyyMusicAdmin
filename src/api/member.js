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

