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
              <span>{{offlineStatus[info.status]}}</span>
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
            <el-form-item label="创建时间:">
              {{ info.create_time }}
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="info.pay_status == 1">
            <el-form-item label="接单时间:">
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
        <ul v-if="info.type == 1">
          <li v-for="(item,index) in info.goodslst" :key="index">
            <gd-image :src="item.goods_image" class="goods-image" width="50" height="50"/>
            <div>
              <p class="goods-name">{{item.goods_name}}</p>
              <p>￥{{item.price}} × {{item.goods_number}}</p>
            </div>
          </li>
        </ul>
        <div v-if="info.type == 2" class="goods-single">
          <div class="goods-image">
            <img src="@/assets/image/bag.png" />
          </div>
          <p>{{info.goods_need_remark}}</p>
        </div>
        <div class="goods-mes" v-if="info.money > 0">
          <p v-if="info.type==2">报价说明：{{info.offer_remark}}</p>
          <p>合计：￥{{ info.money | normNumber }}</p>
          <p>积分抵扣：￥{{ info.integral | normNumber }}</p>
          <p>实付款：￥{{ (info.money - info.integral) | normNumber }}</p>
          <p>平台费：￥{{ info.pay_money| normNumber }}</p>
        </div>
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
  width: 50%;
  border-left: 1px solid #eee;
  padding-left: 20px;
  margin-left: 20px;
  ul{
    li {
      display: flex;
      align-items: center;
      .goods-image{
        margin-right: 10px;
      }
      .goods-name{
        margin-bottom: 5px;
        font-weight: bold;
      }
    }
    margin-bottom: 20px;
  }
  .goods-mes p{
    margin-bottom: 20px;
  }
  .goods-single{
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    .goods-image{
      width: 50px;
      height: 50px;
      background: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-right: 10px;
      img{
        width: 40px;
      }
    }
  }
}


</style>
