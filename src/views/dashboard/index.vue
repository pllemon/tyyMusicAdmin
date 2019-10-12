<template>
  <div class="dashboard">
    111
    <!-- <el-row :gutter="15">
      <el-col :span="8">
        <el-card class="box-card">
          <order-type />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <order-network />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <order-type />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-card class="box-card">
          <finance-line />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <finance-line />
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderNetwork from '@/views/dashboard/charts/network'
import OrderType from '@/views/dashboard/charts/type'
import FinanceLine from '@/views/dashboard/charts/financeLine'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  components: {
    OrderNetwork,
    OrderType,
    FinanceLine
  }
}
</script>

<style lang="scss">
.chart-content{
  position: relative;
}
.charts-select{
  position: absolute;
  top: 6px;
  right: 6px;
}
</style>
<style lang="scss" scoped>
.dashboard{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  display: block;
  background: #f2f2f2;
  box-sizing: border-box;
  padding: 30px;
  .el-card{
    box-shadow: none;
  }
}
.el-row{
  margin-bottom: 15px;
}
</style>
