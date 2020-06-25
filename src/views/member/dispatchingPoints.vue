<template>
  <el-dialog :modal-append-to-body="false" title="积分增减" :visible="true" width="500px" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" v-loading="loading">
      <el-form-item label="积分数" prop="integral">
        <el-input-number v-model="form.integral" :min="-10000" :max="10000" label="正数为增加积分、负数为减少积分"></el-input-number>
      </el-form-item>
      <el-form-item label="增减原因" prop="remark">
        <el-input type="textarea" :rows="4" placeholder="请输入增减原因" v-model="form.remark"></el-input>
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
import { senuserintegral } from '@/api/member'

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
      info: {},
      form: {
        integral: 0,
        remark: ''
      },
      rules: {
        integral: [{ required: true, message: '请输入积分数', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入增减原因', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({
      identityType: state => state.dict.identityType
    })
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.useridlist = this.dialogMes.ids
          senuserintegral(this.form).then(() => {
            this.common.closeComponent(this)
          })
        }
      })
    }
  }
}
</script>
