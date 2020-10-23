/**
 * 页面共用js
 */
import moment from 'moment'
import { Notification } from 'element-ui';
import { MessageBox } from 'element-ui';
import { getNetworkList } from '@/api/network'
import { getToken } from '@/utils/auth'
import { workbind } from '@/api/user'
import store from '@/store'

// 全局websocket
function initSocket() {
  console.log('执行websocket函数')
  store.commit('news/setSocket', true)
  let socket = new WebSocket('ws://120.25.25.90:2346')
  socket.onopen = function() { console.log('WebSocket连接成功') }
  socket.onerror = function() { console.log('WebSocket连接失败') }
  socket.onmessage = function(e) {
    const res = JSON.parse(e.data)
    if (res.type == 'init') {
      workbind({
        client_id: res.client_id
      }).then(() => {}).catch(() => {})
    } else if (res.type == 'ping') {

    } else {
      console.log('--------新消息!!!!--------------------')
      console.log(res)
      console.log('----------------------------')
      const message = JSON.parse(res.message)
      if (res.type == 'makeOrder') {
        showNotify({
          title: '新订单',
          message: `用户 ${message.name}（${message.phone}）下了个新订单，请及时处理！`,
          icon: 'el-icon-s-claim'
        })
        store.commit('news/ADD_NEWS', res)
      } else if (res.type == 'payEarnest') {
        showNotify({
          title: '用户已支付',
          message: `订单编号 ${message.orderSn} ，用户已支付，请及时处理！`,
          icon: 'el-icon-s-finance',
          callback() {
            that.dialogMes = {id: message.order_id}
            that.currentComponent = 'OrderDetails'
          }
        })
        store.commit('news/ADD_NEWS', res)
      } else if (res.type == 'newMaster') {
        showNotify({
          title: '师傅申请',
          message: `用户 ${message.name}（${message.phone}）申请成为师傅，请及时处理！`,
          icon: 'el-icon-user-solid'
        })
        store.commit('news/ADD_NEWS', res)
      } else if (res.type == 'newBusiness') {
        showNotify({
          title: '商家申请',
          message: `用户 ${message.name}（${message.phone}）申请成为商家，请及时处理！`,
          icon: 'el-icon-s-custom'
        })
        store.commit('news/ADD_NEWS', res)
      } else if (res.type == 'crafSetTlement') {
        showNotify({
          title: '师傅申请提现',
          message: `${message.name}申请提现${message.money}元，请及时处理！`,
          icon: 'el-icon-s-finance'
        })
        store.commit('news/ADD_NEWS', res)
      }  else if (res.type == 'userSetTlement') {
        showNotify({
          title: '用户申请提现',
          message: `${message.name}申请提现${message.money}元，请及时处理！`,
          icon: 'el-icon-s-finance'
        })
        store.commit('news/ADD_NEWS', res)
      } else {
        console.log(res.message)
      }
    }
  }
  socket.onclose = function(event) {
    console.log('webSocket断开连接,2s后重连....')
    console.log(event)
    setTimeout(() => {
      if (getToken()) {
         initSocket()
      }
    }, 2000)
  }
}

function showNotify(obj) {
  Notification({
    title: obj.title || '通知',
    message: obj.message || '',
    offset: 50,
    duration: 2000,
    iconClass: obj.icon || 'el-icon-warning-outline',
    customClass: 'websocket-notify'
  })
}

// -----------------------------------------------------

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
  let typeList = ['Details', 'Update', 'Examine', 'Appoint', 'SettlementExamine']
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
  let globalSearch = store.getters.globalSearch
  getNetworkList({
    province: globalSearch.province,
    city: globalSearch.city,
    district: globalSearch.district,
    name: '',
    region: '',
    author: '',
    is_show: '',
    page: 1,
    limit: 2000
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


// 对象深拷贝
function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
              result[key] = deepCopy(obj[key])
          } else {
              result[key] = obj[key]
          }
      }
  }
  return result
}

export default {
  ip: 'https://www.dsfjjwx.com/',
  search, // 搜索表单
  resetSearch, // 重置搜索表单
  updateRecord, // 更新状态
  loadComponent, // 加载弹窗组件
  closeComponent, // 关闭弹窗组件
  notify, // 提示
  getAllNetwork, // 获取全部网点
  timePickerOptions, // 快捷时间选项,
  exportExcel, // 导出excel,
  deepCopy,
  initSocket
}