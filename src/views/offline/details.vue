<template>
  <el-dialog :modal-append-to-body="false" title="详情" :visible="true" width="1100px" :before-close="handleClose">
    <div class="section detail-form" v-loading="loading">
      <el-form class="flex1" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单编号:">
              {{ info.order_sn }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态:">
              <span v-if="info.status == 1 && info.pay_status == 0">待商家确认</span>
              <span v-if="info.status == 1 && info.pay_status == 1">已完成</span>
              <span v-if="info.status == 2">已取消</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单用户:">
              <gd-image :src="info.headerurl" headUrl width="40" height="40"/>
              {{ info.user_name }} {{ info.user_phone }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="服务商家:">
              <gd-image :src="info.shopimg" width="80" height="40"/>
              {{ info.business_name }} {{ info.business_phone }} ( {{ info.business_address }} )
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总消费金额:">
              {{ info.money | normNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户积分抵扣:">
              {{ info.integral | normNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="线下支付金额:">
              {{ (info.money - info.integral) | normNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="平台费:">
              {{ info.pay_money| normNumber }}
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="积分抵扣平台费:">
              {{ info.use_integral| normNumber }}
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="创建时间:">
              {{ info.creat_time }}
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="info.status == 1 && info.pay_status == 1">
            <el-form-item label="完成时间:">
              {{ info.pay_time }}
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="info.status == 2">
            <el-form-item label="取消时间:">
              {{ info.cancel_time }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
.section{
  margin-bottom: 40px;
  .section-title{
    margin-bottom: 15px;
  }
}
.order-mes{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 33.33%;
    margin-bottom: 15px;
    box-sizing: border-box;
    font-weight: bold;
    label{
      margin-bottom: 5px;
      display: block;
      font-weight: normal;
    }
  }
}

.master-list{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 32%;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    line-height: 1.5;
    margin-right: 2%;
    padding: 10px;
    box-sizing: border-box;
    &:nth-of-type(3n){
      margin-right: 0;
    }
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      background: #f2f2f2;
    }
  }
}
</style>
