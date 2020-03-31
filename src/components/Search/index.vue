<template>
  <el-form :inline="true" :model="form" size="mini" class="common-search">
    <el-form-item label="筛选:">
    </el-form-item>
    <el-form-item>
      <el-date-picker
        v-model="form.year"
        type="year"
        placeholder="选择年"
      />
    </el-form-item>
    <el-form-item>
      <el-date-picker
        v-model="form.month"
        type="month"
        placeholder="选择月"
      />
    </el-form-item>
    <el-form-item>
      <el-select v-model="form.network_id" placeholder="选择网点">
        <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        year: '',
        month: ''
      },
      networkList: [],
      network_id: ''
    }
  },
  created() {
    this.common.getAllNetwork(this)
  }
}
</script>

<style lang="scss">
.common-search{
  padding: 8px;
  display: flex;
  justify-content: center;
  .el-form-item{
    margin-bottom: 0;
  }
}
</style>
