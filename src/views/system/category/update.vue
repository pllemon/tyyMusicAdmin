<template>
  <el-dialog :modal-append-to-body="false" :title="dialogMes.id?'编辑':'新增'" :visible="true" width="600px" :before-close="handleClose" :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px" v-loading="loading">
      <el-form-item label="类目名称：" prop="type_name">
        <el-input v-model="form.type_name" />
      </el-form-item>
      <el-form-item label="排序：" prop="orders">
        <el-input v-model="form.orders" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
import { updateRecord } from '@/api/category'

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
        type_name: '',
        orders: '',
        status: 1
      },
      rules: {
        type_name: [{ required: true, message: '请输入类目名称', trigger: 'blur' }]
      }
    }
  },

  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submit() {
      const that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          that.loading = true
          updateRecord(that.form).then(response => {
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
