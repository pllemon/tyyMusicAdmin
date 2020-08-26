<template>
  <el-dialog :modal-append-to-body="false" title="审核佣金" :visible="true" width="600px" :before-close="handleClose" :close-on-click-modal="false">
    <el-form ref="form" :model="form" label-width="140px" style="margin-right: 50px">
      <el-form-item label="审核结果：" required>
        <el-radio-group v-model="form.status">
          <el-radio label="2">已发放</el-radio>
          <el-radio label="3">驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="流水号：">
        <el-input placeholder="请输入" v-model="form.pay_order_sn" />
      </el-form-item>
      <el-form-item label="备注：" prop="shremark">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6 }"
          placeholder="请输入"
          v-model="form.shremark"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="loading" @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitExamine" :loading="loading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { examinewithdrawa } from '@/api/member'  

/* status 1未审核2通过3驳回 */
export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,

      form: {
        id: '',
        pay_order_sn: '',
        status: '2'
      }
    }
  },
  created() {
    console.log(this.dialogMes)
    this.form.id = this.dialogMes.id
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitExamine() {
      const that = this
      that.loading = true
      that.$refs.form.validate((valid) => {
        if (valid) {
          that.loading = true
          examinewithdrawa(that.form).then(response => {
            that.common.closeComponent(that)
          }).finally(() => {
            that.loading = false
          })
        }
      })
    }
  }
}
</script>