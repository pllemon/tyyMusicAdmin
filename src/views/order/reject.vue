<template>
  <el-dialog title="取消订单" :modal-append-to-body='false' :visible="true" width="500px" :before-close="handleClose">
    <p style="margin-bottom: 10px">确定取消该订单？可填写取消原因：</p>
    <el-input
      type="textarea"
      :autosize="{ minRows: 6}"
      placeholder="请输入"
      v-model="reject_reason"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitReject">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      reject_reason: ''
    }
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitReject() {
      console.log(this.dialogMes.id)
      console.log(this.rejectReason)
      this.handleClose()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
