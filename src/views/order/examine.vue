<template>
  <el-dialog :modal-append-to-body="false" title="分配网点" :visible="true" width="600px" :before-close="handleClose"  :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px">
      <el-form-item label="服务网点:" prop="network_id">
        <el-select v-model="form.network_id" placeholder="请选择" filterable clearable>
          <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
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
import { getDetails, orderexamine2 } from '@/api/order'  

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
        network_id: ''
      },
      rules: {
        network_id: [{ required: true, message: '请选择服务网点', trigger: 'change' }]
      },
      orderInfo: {},
      networkList: []
    }
  },

  created() {
    const that = this
    this.common.getAllNetwork(this)

    getDetails({
      order_id: that.dialogMes.id
    }).then(response => {
      that.orderInfo = response.data.info
      that.form.order_sn = that.orderInfo.order_sn
      that.form.user_id = that.orderInfo.user_id
      that.form.order_id = that.orderInfo.order_id
    })
  },

  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitExamine() {
      const that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          orderexamine2(that.form).then(response => {
            that.common.closeComponent(that)
          })
        }
      })
    }
  }
}
</script>