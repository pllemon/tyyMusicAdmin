<template>
  <el-dialog :modal-append-to-body="false" title="详情" :visible="true" width="1100px" :before-close="handleClose">
    <div class="section detail-form" v-loading="loading">
      <el-form class="flex1" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="订单编号:">
              {{ info.order_sn }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="订单状态:">
              <span v-if="info.status == 1 && info.pay_status == 0">待商家确认</span>
              <span v-if="info.status == 1 && info.pay_status == 1">已完成</span>
              <span v-if="info.status == 2">已取消</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="下单用户:">
              {{ info.user_name }} {{ info.user_phone }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="服务商家:">
              {{ info.business_name }} {{ info.business_phone }} 
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商家地址:">
              {{ info.business_address }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="总消费金额:">
              {{ info.money | normNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户积分抵扣:">
              {{ info.integral | normNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="线下支付金额:">
              {{ (info.money - info.integral) | normNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平台费:">
              {{ info.pay_money| normNumber }}
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="积分抵扣平台费:">
              {{ info.use_integral| normNumber }}
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="创建时间:">
              {{ info.creat_time }}
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="info.status == 1 && info.pay_status == 1">
            <el-form-item label="完成时间:">
              {{ info.pay_time }}
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="info.status == 2">
            <el-form-item label="取消时间:">
              {{ info.cancel_time }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="goods-list">
        <p class="section-title small">商品清单</p>
        <ul>
          <li v-for="(item,index) in info.goodslst" :key="index">
            <gd-image :src="item.goods_image" class="goods-image"/>
            <div>
              <p class="goods-name">{{item.goods_name}}</p>
              <p>单价：￥{{item.price}}，数量：{{item.goods_number}}</p>
            </div>
          </li>
        </ul>
        <p>合计：￥，使用积分抵扣：，线下需支付：￥，</p>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails } from '@/api/offline'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: true,
      info: {}
    }
  },
  computed: {
    ...mapState({
      offlineStatus: state => state.dict.offlineStatus
    })
  },
  created() {
    const that = this
    getDetails({
      bo_id: that.dialogMes.id
    }).then(response => {
      that.info = response.data
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    }
  }
}
</script>

<style scoped lang="scss">
.detail-form{
  display: flex;
}
.goods-list{
  width: 40%;
  border-left: 1px solid #eee;
  padding-left: 10px;
  margin-left: 10px;
  li {
    display: flex;
    .goods-image{
      width: 100px;
      height: 100px;
    }
  }
}

</style>
