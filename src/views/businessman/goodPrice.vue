<template>
  <el-dialog :modal-append-to-body="false" title="设置商品价格" :visible="true" width="500px" :before-close="handleClose" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form" label-width="160px" style="margin-right: 50px" v-loading="loading">
      <template>
        <el-form-item label="当前添加商品价格：">
          <el-input v-model="oldPrice" style="width:180px" disabled></el-input>
        </el-form-item>
      </template>
      <template>
        <el-form-item label="最新添加商品价格：" prop="value">
          <el-input-number v-model="form.value" :precision="2" :step="1"></el-input-number>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" v-if="!loading" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { upgoodsprice } from '@/api/businessman'

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
        value: 10
      },
      oldPrice: '',
      loading: true,
      rules: {
        value: [{ required: true, message: '请输入', trigger: 'change' }],
      }
    }
  },

  created() {
    upgoodsprice({}).then(res => {
      this.oldPrice = res.data.value
      this.loading = false
    })
  },

  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitForm() {
      const that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          upgoodsprice(that.form).then(response => {
            that.common.closeComponent(that)
          })
        }
      })
    }
  }
}
</script>
