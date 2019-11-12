/**
 * 页面共用js
 */
import moment from 'moment'
import { Notification } from 'element-ui';
import { MessageBox } from 'element-ui';
import { getNetworkList } from '@/api/network'

function search(target) {
  target.queryMes.page = 1
  target.queryMes.limit = 10
  target.fetchData()
}

function resetSearch(target) {
  target.$refs.searchForm.resetFields()
  target.queryMes.page = 1
  target.queryMes.limit = 10
  target.fetchData()
}

function updateRecord(type, target, obj, callback) {
  let typeArr = ['全部', '启用', '禁用', '删除']
  MessageBox.confirm(`确定${typeArr[type]}该条记录？`, '提示', {
    type: 'warning'
  }).then(() => {
    callback(obj).then(() => {
      notify()
      target.fetchData();
    })
  }).catch(() => {
    console.log('取消')
  })
}

function loadComponent(target, type, id = '') {
  let typeList = ['Details', 'Update', 'Examine', 'Appoint']
  target.dialogMes = {
    id: id
  }
  target.currentComponent = typeList[type]
}

function closeComponent(target, callback) {
  notify()
  target.$parent.fetchData()
  target.$parent.currentComponent = ''
  
  if (callback) {
    callback()
  }
}

function notify() {
  Notification({
    title: '提示',
    type: 'success',
    message: '操作成功',
    duration: 1000
  })
}

function getAllNetwork(target, callback) {
  getNetworkList({
    name: '',
    region: '',
    author: '',
    is_show: '',
    page: 1,
    limit: 1000
  }).then(response => {
    target.networkList = response.data.data
    if (callback) {
      callback(response.data.data)
    }
  })
}

function timePickerOptions() {
  let options = {
    shortcuts: [{
      text: '今日',
      onClick(picker) {
        const start = moment().startOf('days').format('YYYY-MM-DD HH:mm:ss')
        const end = moment().endOf('days').format('YYYY-MM-DD HH:mm:ss')
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '本周',
      onClick(picker) {
        const start = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss')
        const end = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss')
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '本月',
      onClick(picker) {
        const start = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
        const end = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
        picker.$emit('pick', [start, end])
      }
    }]
  }

  return options
}

function exportExcel(target) {
  $(target.$refs.exportForm).find('div').html('')
  for (let i in target.queryMes) {
    if (target.queryMes[i] != '' && i != 'page' && i != 'limit') {
     $(target.$refs.exportForm).find('div').append(
       `<input type="text" name="${i}" value="${target.queryMes[i]}"/>`
     ) 
    }
  }
  $(target.$refs.exportForm).submit()
}

export default {
  ip: 'http://47.106.100.144/',
  search, // 搜索表单
  resetSearch, // 重置搜索表单
  updateRecord, // 更新状态
  loadComponent, // 加载弹窗组件
  closeComponent, // 关闭弹窗组件
  notify, // 提示
  getAllNetwork, // 获取全部网点
  timePickerOptions, // 快捷时间选项,
  exportExcel: exportExcel // 导出excel
}