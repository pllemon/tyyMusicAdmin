/**
 * 页面共用js
 */
function resetSearch(target) {
  target.$refs.searchForm.resetFields()
  target.fetchData()
}

function closeDialog(target) {
  console.log(444)
  target.$parent.currentComponent = ''
}

export default{
  resetSearch, // 重置搜索表单
  closeDialog // 关闭弹窗
}