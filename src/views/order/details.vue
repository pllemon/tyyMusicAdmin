<template>
  <el-dialog :modal-append-to-body='false' :title="title[dialogMes.type]" :visible="true" width="1200px" :before-close="handleClose">
    <!-- 步骤条 -->
    <el-steps :active="1" finish-status="success" style="margin-bottom: 50px">
      <el-step title="待审核" description="后台审核订单" />
      <el-step title="待支付" description="用户支付定金" />
      <el-step title="待发布" description="后台发布订单" />
      <el-step title="报名中" description="后台指派师傅" />
      <el-step title="施工中" description="师傅上门施工" />
      <el-step title="待支付" description="用户支付尾款" />
      <el-step title="已完成" description="用户进行评价，师傅上传资料" />
    </el-steps>

    <div class="section">
      <p class="section-title">订单基本信息</p>
      <ul class="order-mes">
        <li>
          <label>订单ID：</label>
          <p>{{orderInfo.order_id}}</p>
        </li>
        <li>
          <label>下单用户：</label>
          <p>{{orderInfo.service_demand}}</p>
        </li>
        <li>
          <label>服务需求：</label>
          <p>{{orderInfo.service_demand}}</p>
        </li>
        <li>
          <label>服务地址：</label>
          <p>{{orderInfo.address}}</p>
        </li>
        <li>
          <label>预约时间：</label>
          <p>{{orderInfo.appo_time}}</p>
        </li>
        <li>
          <label>创建时间：</label>
          <p>{{orderInfo.create_time}}</p>
        </li>
        <li>
          <label>用户备注：</label>
          <p>{{orderInfo.remark}}</p>
        </li>
        <li>
          <label>订单状态：</label>
          <p>待用户支付定金</p>
        </li>
      </ul>
    </div>

    <div class="section">
      <p class="section-title">审核资料上传</p>
      <div class="flex" style="padding: 20px 0;">
        <el-form ref="examineForm" :model="examineForm" :rules="rules" label-width="120px" style="width: 600px;margin-right: 50px">
          <el-form-item label="订单总价格：" prop="total_price">
            <el-input v-model.number="examineForm.total_price" />
          </el-form-item>
          <el-form-item label="定金金额：" prop="earnest_price">
            <el-input v-model.number="examineForm.earnest_price" />
          </el-form-item>
          <el-form-item label="师傅工资：" prop="crafts_man_price">
            <el-input v-model.number="examineForm.crafts_man_price" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitExamine">提交</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
        <div>
          <gd-upload tip="请上传报价单" @success="uploadSuccess"/>
        </div>
      </div>
    </div>

    <div class="section">
      <p class="section-title">师傅报名情况</p>
      <ul class="master-list">
        <li v-for="(item, index) in list" :key="index">
          <img src="">
          <div class="flex1">
            <p style="font-weight: bold">李师傅 NO3424</p>
            <p><i class="el-icon-phone-outline" /> 1343445345</p>
          </div>
          <el-button type="primary" size="mini">选择</el-button>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
import { getDetails, orderexamine } from '@/api/order'  

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      title: ['订单详情', '审核订单', '指派订单'],
      list: [1, 2, 3, 4, 5],
      listLoading: true,
      examineForm: {
        total_price: '',
        earnest_price: '',
        crafts_man_price: '',
        imglist: '',
        order_sn: '',
        user_id: '',
        order_id: ''
      },
      rules: {
        total_price: [
          { required: true, message: '请输入订单总价格', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值'}
        ],
        earnest_price: [
          { required: true, message: '请输入定金金额', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值'}
        ],
        crafts_man_price: [
          { required: true, message: '请输入师傅工资', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值'}
        ],
      },
      orderInfo: {}
    }
  },
  created() {
    let that = this
    getDetails({
      order_id: that.dialogMes.id
    }).then(response => {
      that.orderInfo = response.data.info[0]
      that.examineForm.order_sn = that.orderInfo.order_sn
      that.examineForm.user_id = that.orderInfo.user_id
      that.examineForm.order_id = that.orderInfo.order_id
    })
  },
  methods: {
    uploadSuccess(id) {
      this.examineForm.imglist = id
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitExamine() {
      let that = this
      that.$refs.examineForm.validate((valid) => {
        if (valid) {
          orderexamine(that.examineForm).then(response => {
            that.$message({
              message: response.message,
              type: 'success'
            })
            that.$parent.fetchData()
            that.$parent.currentComponent = ''
          })
        }
      })
    },
    handleAvatarSuccess() {

    },
    beforeAvatarUpload() {

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
