<template>
  <el-dialog :modal-append-to-body="false" title="详情" :visible="true" width="1100px" :before-close="handleClose">
    <div class="section detail-form">
      <p class="section-title small">订单信息</p>
      <div class="flex-center">
        <gd-image width="140" height="140" style="margin-left:20px" />
        <el-form class="flex1" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="订单编号:">
                {{ info.sn }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下单用户:">
                {{ info.sfz }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务商家:">
                {{ info.phone }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总消费金额:">
                {{ info.enter_time }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户积分抵扣:">
                {{ info.create_time }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="线下支付金额:">
                {{ info.address }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="平台费:">
                {{ info.desc }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="积分抵扣平台费:">
                {{ info.desc }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户积分返还:">
                {{ info.examine_time }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间:">
                {{ info.examine_time }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单状态:">
                {{ offlineStatus[info.status] }}
                <span v-show="info.reject_reason">（{{ info.reject_reason }}）</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
