<template>
  <el-dialog :modal-append-to-body="false" title="审核订单" :visible="true" width="800px" :before-close="handleClose">
    <el-form ref="examineForm" :model="examineForm" :rules="rules" label-width="140px" style="margin-right: 50px">
      <el-form-item label="审核结果：" required>
        <el-radio-group v-model="examineForm.status">
          <el-radio label="TG">通过</el-radio>
          <el-radio label="BH">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="examineForm.status == 'TG'">
        <el-form-item label="订单总价格(元)：" prop="total_price">
          <el-input v-model.number="examineForm.total_price" />
        </el-form-item>
        <el-form-item label="定金金额(元)：" prop="earnest_price">
          <el-input v-model.number="examineForm.earnest_price" />
        </el-form-item>
        <el-form-item label="师傅工资(元)：" prop="crafts_man_price">
          <el-input v-model.number="examineForm.crafts_man_price" />
        </el-form-item>
        <el-form-item label="报价单照片：" required>
          <gd-upload width="260" height="180" @success="uploadSuccess"/>
        </el-form-item>
      </template>
      <template v-if="examineForm.status == 'BH'">
        <el-form-item label="不通过原因：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6}"
            placeholder="请输入"
            v-model="examineForm.qxremark"
          />
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
      examineForm: {
        total_price: '',
        earnest_price: '',
        crafts_man_price: '',
        imglist: '',
        order_sn: '',
        user_id: '',
        order_id: '',
        status: 'TG',
        qxremark: ''
      },
      rules: {
        total_price: [
          { required: true, message: '请输入订单总价格', trigger: 'blur' },
          { type: 'number', message: '订单总价格必须为数字值'}
        ],
        earnest_price: [
          { required: true, message: '请输入定金金额', trigger: 'blur' },
          { type: 'number', message: '定金金额必须为数字值'}
        ],
        crafts_man_price: [
          { required: true, message: '请输入师傅工资', trigger: 'blur' },
          { type: 'number', message: '师傅工资必须为数字值'}
        ]
      },
      orderInfo: {}
    }
  },

  created() {
    const that = this
    getDetails({
      order_id: that.dialogMes.id
    }).then(response => {
      that.orderInfo = response.data.info
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
      const that = this
      if (that.examineForm.status == 'TG' && !that.examineForm.imglist) {
        this.$message.error('请上传报价单');
        return false;
      }
      that.$refs.examineForm.validate((valid) => {
        if (valid) {
          orderexamine(that.examineForm).then(response => {
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