<template>
  <el-dialog :modal-append-to-body="false" :title="dialogMes.id?'编辑':'新增'" :visible="true" width="800px" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6}"
          placeholder="请输入"
          v-model="form.dec"
        />
      </el-form-item>
      <el-form-item label="相关照片：" required>
        <gd-upload width="260" height="180" @success="uploadSuccess"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitExamine">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails, updateRecord, uploadUrl } from '@/api/show'  

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
        title: '',
        dec: '',
        imgurl1: '',
        imgurl2: '',
        imgurl3: '',
        imgurl4: ''
      },
      uploadUrl: uploadUrl(),
      rules: {
        total_price: [
          { required: true, message: '请输入订单总价格', trigger: 'blur' },
          { type: 'number', message: '订单总价格必须为数字值' }
        ],
        earnest_price: [
          { required: true, message: '请输入定金金额', trigger: 'blur' },
          { type: 'number', message: '定金金额必须为数字值' }
        ],
        crafts_man_price: [
          { required: true, message: '请输入师傅工资', trigger: 'blur' },
          { type: 'number', message: '师傅工资必须为数字值' }
        ]
      },
      orderInfo: {}
    }
  },

  created() {
    if (this.dialogMes.id) {
      getDetails()
    }
  },

  methods: {
    getDetails() {
      let that = this
      getDetails({
        order_id: that.dialogMes.id
      }).then(response => {
        console.log(response)
      })
    },

    uploadSuccess(id) {
      this.form.imglist = id
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitExamine() {
      let that = this
      if (that.form.status == 'TG' && !that.form.imglist) {
        this.$message.error('请上传报价单');
        return false
      }
      that.$refs.form.validate((valid) => {
        if (valid) {
          updateRecord(that.form).then(response => {
            this.$notify({
              title: '提示',
              type: 'success',
              message: '操作成功'
            })
            that.$parent.fetchData()
            that.$parent.currentComponent = ''
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