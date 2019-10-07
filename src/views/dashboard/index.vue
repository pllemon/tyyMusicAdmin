<template>
  <div style="height: 100%;position:absolute;top:0;left:0;width:100%">
    <div class="flex card-list">
      <el-card class="box-card flex1">
        <div class="mes">
          <p>本月订单</p>
          <p>3454</p>
        </div>
      </el-card>
      <el-card class="box-card flex1">
        <div class="mes">
          <p>本月订单</p>
          <p>3454</p>
        </div>
      </el-card>
      <el-card class="box-card flex1">
        <div class="mes">
          <p>本月订单</p>
          <p>3454</p>
        </div>
      </el-card>
      <el-card class="box-card flex1">
        <div class="mes">
          <p>本月订单</p>
          <p>3454</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.card-list{
  .box-card{
    margin: 20px 10px;
    .mes{
      p:nth-of-type(1){
        color: #888;
      }
      p:nth-of-type(2){
        font-size: 30px;
        margin-top: 5px;
      }
    }
  }
}
</style>
