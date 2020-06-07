<template>
  <el-dialog :modal-append-to-body="false" title="审核商家" :visible="true" width="800px" :before-close="handleClose" :close-on-click-modal="false">
    <el-form ref="examineForm" :model="examineForm" label-width="140px" style="margin-right: 50px">
      <el-form-item label="审核结果：" required>
        <el-radio-group v-model="examineForm.status" @change="changeStatus">
          <el-radio label="1">通过</el-radio>
          <el-radio label="3">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="examineForm.status == '1'">
        <el-form-item label="加盟金额：">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="examineForm.money"
          />
        </el-form-item>
      </template>
      <template v-if="examineForm.status == '3'">
        <el-form-item label="不通过原因：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6}"
            placeholder="请输入"
            v-model="examineForm.bhremark"
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
import { businessexamine } from '@/api/businessman'  

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
        busines_id: '',
        status: '1',
        bhremark: '',
        money: ''
      }
    }
  },

  methods: {
    changeStatus(val) {
      if (val == '1') {
        this.examineForm.bhremark = ''
      }
      this.$refs.examineForm.clearValidate() 
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitExamine() {
      const that = this
      that.examineForm.busines_id = that.dialogMes.id
      that.$refs.examineForm.validate((valid) => {
        if (valid) {
          businessexamine(that.examineForm).then(response => {
            that.common.closeComponent(that)
          })
        }
      })
    }
  }
}
</script>
