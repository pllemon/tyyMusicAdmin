<template>
  <el-dialog :modal-append-to-body="false" title="审核薪酬" :visible="true" width="600px" :before-close="handleClose" :close-on-click-modal="false">
    <el-form ref="form" :model="form" label-width="140px" style="margin-right: 50px">
      <el-form-item label="审核结果：" required>
        <el-radio-group v-model="form.status">
          <el-radio label="2">通过</el-radio>
          <el-radio label="3">不通过</el-radio>
        </el-radio-group>
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
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitExamine">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { craftsmansettlement } from '@/api/master'  

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

      form: {
        craftsman_id: '',
        slid: '',
        status: '2',
        shremark: ''
      }
    }
  },
  created() {
    this.form.slid = this.dialogMes.id
    this.form.craftsman_id = this.dialogMes.craftsman_id
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitExamine() {
      const that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          craftsmansettlement(that.form).then(response => {
            that.common.closeComponent(that)
          })
        }
      })
    }
  }
}
</script>