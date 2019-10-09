<template>
  <div class="dashboard">
    <el-card class="box-card">
      <view>
        
      </view>
      <ul class="charts-list">
        <li>
          <order-network />
        </li>
        <li>
          <order-type />
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderNetwork from '@/views/dashboard/order/network'
import OrderType from '@/views/dashboard/order/type'

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
    OrderType
  }
}
</script>

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
  padding: 20px;
}
.charts-list{
  display: flex;
  li{
    flex: 1;
    margin: 20px;
    border: 1px solid red;
  }
}
</style>
