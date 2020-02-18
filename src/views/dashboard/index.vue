<template>
  <div class="dashboard" style="display:none">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card class="box-card">
          <order />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <el-card class="box-card">
          <Offline />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <person />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card class="box-card">
          <finance-line />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Order from '@/views/dashboard/charts/order'
import Offline from '@/views/dashboard/charts/offline'
import Person from '@/views/dashboard/charts/person'
import FinanceLine from '@/views/dashboard/charts/financeLine'

export default {
  name: 'Dashboard',
  components: {
    Order,
    Offline,
    Person,
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
  top: 0px;
  right: 0px;
}
.charts-tips{
  padding: 20px 0 0 50px;
  font-size: 13px;
  color: #666;

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
