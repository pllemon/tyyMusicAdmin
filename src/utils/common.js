/**
 * 页面共用js
 */
function resetSearch(target) {
  target.$refs.searchForm.resetFields()
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


export default{
  resetSearch, // 重置搜索表单
  enableRecord, // 启用和禁用
  removeRecord // 删除
}