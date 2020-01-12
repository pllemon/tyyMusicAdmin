<template>
  <el-dialog :modal-append-to-body="false" title="审核订单" :visible="true" width="800px" :before-close="handleClose"  :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px">
      <el-form-item label="审核结果：" required>
        <el-radio-group v-model="form.status" @change="changeStatus">
          <el-radio label="TG">通过</el-radio>
          <el-radio label="BH">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form.status == 'TG'">
        <template v-if="form.is_bj == 0">
          <el-form-item label="预约时间:" prop="appo_time">
            <el-date-picker
              v-model="form.appo_time"
              type="datetime"
              format="yyyy-MM-dd HH:mm:00"
              value-format="yyyy-MM-dd HH:mm:00"
              placeholder="请选择上门服务时间"
            />
          </el-form-item>
          <el-form-item label="服务网点:" prop="network_id">
            <el-select v-model="form.network_id" placeholder="请选择">
              <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="后台备注:">
            <el-input v-model="form.htremark" type="textarea" :rows="4" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="订单总价格(元)：" prop="total_price">
            <el-input v-model.number="form.total_price" />
          </el-form-item>
          <el-form-item label="报价单照片：" required>
            <gd-upload 
              width="260" 
              height="180" 
              action='admin/uploadordersimg'
              @success="uploadSuccess"
            />
          </el-form-item>
        </template>
      </template>
      <template v-if="form.status == 'BH'">
        <el-form-item label="不通过原因：">
          <el-input v-model="form.qxremark" type="textarea" :rows="4" />
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitExamine">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
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
      form: {
        order_sn: '',
        user_id: '',
        order_id: '',
        status: 'TG',

        qxremark: '',

        bjimg: '',
        total_price: '',
        is_bj: 0,
        
        appo_time: '',
        network_id: '',
        htremark: ''
      },
      rules: {
        total_price: [
          { required: true, message: '请输入订单总价格', trigger: 'blur' },
          { type: 'number', message: '订单总价格必须为数字值'}
        ],
        appo_time: [{ required: true, message: '请选择预约时间', trigger: 'change' }],
        network_id: [{ required: true, message: '请选择服务网点', trigger: 'change' }]
      },
      orderInfo: {},
      networkList: []
    }
  },

  created() {
    const that = this
    that.form.is_bj = that.dialogMes.type

    this.common.getAllNetwork(this)

    getDetails({
      order_id: that.dialogMes.id
    }).then(response => {
      that.orderInfo = response.data.info
      that.form.order_sn = that.orderInfo.order_sn
      that.form.user_id = that.orderInfo.user_id
      that.form.order_id = that.orderInfo.order_id
      that.form.appo_time = that.orderInfo.appo_time
      that.form.network_id = that.orderInfo.network_id
      that.form.htremark = that.orderInfo.htremark
    })
  },

  methods: {
    changeStatus(val) {
      if (val == 'TG') {
        this.form.qxremark = ''
      } else {
        this.form.total_price = ''
      }
      this.$refs.form.clearValidate() 
    },

    uploadSuccess(data) {
      this.form.bjimg = data.id
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitExamine() {
      const that = this
      if (that.form.status == 'TG' && !that.form.bjimg) {
        this.$message.error('请上传报价单');
        return false;
      }
      that.$refs.form.validate((valid) => {
        if (valid) {
          orderexamine(that.form).then(response => {
            that.common.closeComponent(that)
          })
        }
      })
    }
  },
  computed: {
    ...mapState({
      orderStatus: state => state.dict.orderStatus
    })
  }
}
</script>