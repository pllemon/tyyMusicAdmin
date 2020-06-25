<template>
  <div class="gd-pagination">
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 10, 20, 50, 100]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: [String, Number],
      default: 0
    },
    currentPage: {
      type: [String, Number],
      default: 1
    },
    pageSize: {
      type: [String, Number],
      default: 10
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSizeChange(val) {
      const parent = this.$parent.queryMes ? this.$parent : this.$parent.$parent
      parent.queryMes.limit = val
      parent.fetchData()
    },
    handleCurrentChange(val) {
      const parent = this.$parent.queryMes ? this.$parent : this.$parent.$parent
      parent.queryMes.page = val
      parent.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.gd-pagination{
  text-align: right;
  width: 100%;
  margin-top: 10px;
}
</style>
