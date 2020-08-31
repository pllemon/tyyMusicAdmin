<template>
  <el-dialog :modal-append-to-body="false" :title="dialogMes.id?'编辑':'新增'" :visible="true" width="680px" :before-close="handleClose">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" style="margin: 0 40px" v-loading="loading">
      <el-form-item label="类目名称" prop="url">
        <el-input v-model="form.url" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="排序" prop="orders">
        <el-input v-model="form.orders" placeholder="请输入，数字越大越靠后" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails, updateRecord } from '@/api/category'  

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      vm: this,
      loading: true,

      file: {},
      form: {
        type: '0',
        url: '',
        orders: '',
        position: '1'
      },
      rules: {
        type: [{ required: true, message: '请选择链接类型', trigger: 'change' }]
      }
    }
  },
  created() {
    if (this.dialogMes.id) {
      this.getDetails()
    } else {
      this.loading = false
    }
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitForm() {
      const that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          let type = this.form.id ? '2' : '1'
          this.loading = true
          updateRecord(formData, type).then(response => {
            this.common.closeComponent(this)
          }).finally(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
