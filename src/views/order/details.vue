<template>
  <el-dialog :modal-append-to-body="false" title="订单详情" :visible="true" width="1200px" :before-close="handleClose">
    <div class="flex">
      <div class="section" style="width:200px;margin-right: 20px">
        <p class="section-title small">订单时间线</p>
        <el-timeline style="margin-top:30px">
          <el-timeline-item :timestamp="message.info.create_time">用户发布需求</el-timeline-item>
          <el-timeline-item :timestamp="message.info.examine_time">后台审核通过</el-timeline-item>
          <el-timeline-item :timestamp="message.pay.earnest_pay_time">用户支付定金</el-timeline-item>
          <el-timeline-item :timestamp="message.pay.release_time">后台发布订单</el-timeline-item>
          <el-timeline-item timestamp="">梁师傅承接订单</el-timeline-item>
          <el-timeline-item :timestamp="message.pay.tail_pay_time">用户支付尾款并确认完成</el-timeline-item>
          <el-timeline-item timestamp="">用户评价</el-timeline-item>
          <el-timeline-item timestamp="">梁师傅上传师傅秀</el-timeline-item>
        </el-timeline>
      </div>
      <div class="flex1" style="border-left: 1px solid #eee;padding-left: 20px">
        <div class="section detail-form">
          <p class="section-title small">订单信息</p>
          <el-form label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="订单编号:">
                  {{ message.info.order_sn }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="订单状态:">
                  {{ orderStatus[message.info.status] }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下单客户:">
                  {{ message.info.username }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务需求:">
                  {{ message.info.service_demand }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预约时间:">
                  {{ message.info.appo_time }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系用户:">
                  {{ message.info.phone }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="服务地址:">
                  {{ message.info.address }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="用户备注:">
                  {{ message.info.remark }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="订单图片:">
                  <template v-if="message.userimglist.length">
                    <gd-image v-for="(item, index) in message.userimglist" :key="index" :src="item" />
                  </template>
                  <template v-else>
                    无
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-divider />
        </div>
        <div class="section  detail-form">
          <p class="section-title small">报价&报名</p>
          <el-form label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="订单总价格:">
                  {{ message.pay.total_price }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="定金金额:">
                  {{ message.pay.earnest_price }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="尾款金额:">
                  {{ message.pay.tail_price }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="师傅工资:">
                  {{ message.pay.craftsman_price }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="承接师傅:">
                  {{ message.craftsmaninfo.name }} （{{ message.craftsmaninfo.sn }}）
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系师傅:">
                  {{ message.craftsmaninfo.phone }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="报价单:">
                  <gd-image :src="message.bjd.imgurl" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="报名情况:">
                  <template v-if="message.userimglist.length">
                    <ul class="master-list">
                      <li v-for="(item, index) in craftsmanlist" :key="index">
                        <img src="">
                        <div class="flex1">
                          <p style="font-weight: bold">{{ item.name }} {{ item.sn }}</p>
                          <p><i class="el-icon-phone-outline" /> {{ item.phone }}</p>
                        </div>
                      </li>
                    </ul>
                  </template>
                  <template v-else>
                    无
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-divider />
        </div>
        <div class="section  detail-form">
          <p class="section-title small">用户评价&师傅秀</p>
          <el-form label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="用户评价:">
                 
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="师傅秀:">
                  <gd-image v-for="(item, index) in message.img" :key="index" :src="item" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails, ordercraftsmanlist } from '@/api/order'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      craftsmanlist: [],
      message: {
        info: {},
        comment: {},
        bjd: {},
        craftsmaninfo: {},
        craftsmanlist: [],
        ordersshow: {},
        pay: {},
        userimglist: []
      }
    }
  },
  computed: {
    ...mapState({
      orderStatus: state => state.dict.orderStatus
    })
  },

  created() {
    const that = this
    getDetails({
      order_id: that.dialogMes.id
    }).then(response => {
      for (const i in response.data) {
        if (response.data[i]) {
          that.message[i] = response.data[i]
        }
      }
    })

    ordercraftsmanlist({
      order_id: that.dialogMes.id
    }).then(response => {
      that.craftsmanlist = response.data
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
.img-list img{
  width: 300px;
  height: 200px;
  border: 1px solid #f2f2f2;
  margin-right: 20px;
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
