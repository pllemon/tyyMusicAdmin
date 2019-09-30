/**
 * 页面共用js
 */
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

function enableRecord(target, obj, callback) {
  let mes = ''
  if (obj.type == 1) {
    mes = `确定启用${obj.mes}？`
  } else {
    mes = `确定禁用${obj.mes}？`
  }
  target.$confirm(mes, '提示', {
    type: 'warning'
  }).then(() => {
    callback(obj).then(() => {
      target.$message({
        type: 'success',
        message: '设置成功!'
      })
      target.fetchData();
    })
  }).cancel(() => {
    console.log('取消')
  })
}

function removeRecord(target, obj, callback) {
  target.$confirm('确定删除该条记录？', '提示', {
    type: 'warning'
  }).then(() => {
    callback(obj).then(() => {
      target.$message({
        type: 'success',
        message: '设置成功!'
      })
      target.fetchData();
    })
  }).cancel(() => {
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
  target.$notify({
    title: '提示',
    type: 'success',
    message: '操作成功'
  })
  target.$parent.fetchData()
  target.$parent.currentComponent = ''
  
  if (callback) {
    callback()
  }
}

export default{
  search, // 搜索表单
  resetSearch, // 重置搜索表单
  enableRecord, // 启用和禁用
  removeRecord, // 删除
  loadComponent, // 加载弹窗组件
  closeComponent // 关闭弹窗组件
}