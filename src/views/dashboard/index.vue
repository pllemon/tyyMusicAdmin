<template>
  <div class="dashboard">
    <el-row :gutter="15">
      <el-col :span="6">
        <ul class="part-number" style="height:340px;background:#fff">
          <li>
            <img src="@/assets/image/iconguifanbeifen_1.png" />
            <div><p class="number">99</p><p>分配网点</p></div>
            <div><p class="number">99</p><p>发布抢单</p></div>
            <div><p class="number">99</p><p>指派师傅</p></div>
          </li>
          <li>
            <img src="@/assets/image/wode.png" />
            <div><p class="number">99</p><p>师傅审核</p></div>
            <div><p class="number">99</p><p>商家审核</p></div>
          </li>
          <li>
            <img src="@/assets/image/iconguifanbeifen.png" />
            <div><p class="number">99</p><p>师傅一期提现</p></div>
            <div><p class="number">99</p><p>师傅二期提现</p></div>
            <div><p class="number">99</p><p>用户收益提现</p></div>
          </li>
        </ul>
      </el-col>
      <el-col :span="9">
        <el-card class="box-card">
          <order />
        </el-card>
      </el-col>
    </el-row>
    <!-- 
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
    </el-row> -->
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
  padding: 10px;
  .el-card{
    box-shadow: none;
  }
}
.el-row{
  margin-bottom: 15px;
}



.part-number{
  border-radius: 10px;
  color: #353535;
  li{
    display: flex;
    align-items: center;
    padding: 20px;
    font-size: 14px;
    background: #fff;
    &:last-child{
      margin-right: 0;
    }
    .number{
      font-size: 20px;
      margin-bottom: 5px;
    }
    img{
      height: 30px;
    }
    div{
      text-align: center;
      width: 100px;
      margin-left: 20px;
    }
  }
}
</style>
