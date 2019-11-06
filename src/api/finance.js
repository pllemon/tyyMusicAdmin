import request from '@/utils/request'

export function transactionlog(data) {
  return request({
    url: `/admin/transactionlog?page=${data.page}&limit=${data.limit}`,
    method: 'post',
    data
  })
}
