<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">系统公告</p>
      <div class="action">
        <el-button size="small" type="primary" icon="el-icon-document-checked" round @click="saveForm()">保存</el-button>
        <el-button size="small" icon="el-icon-back" round @click="back()">返回</el-button>
      </div>
    </div>

    <div class="table-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px" v-loading="loading">
        <el-row>
          <el-col :span="16">
            <el-form-item label="通知标题:" prop="title">
              <el-input type="text" v-model="form.title"/>
            </el-form-item>
            <el-form-item label="通知内容:" prop="dec">
              <tinymce v-model="form.dec" :toolbar="[]" :height="400" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通知用户:" prop="group">
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getDetails, updateRecord } from '@/api/notice'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        title: '',
        dec: '',
        model: 'add',
        group: 'all',
        id: '',
        is_show: 1
      },
      rules: {
        title: [{ required: true, message: '请输入', trigger: 'change' }],
        dec: [{ required: true, message: '请输入', trigger: 'change' }],
      },
      loading: true,
      id: ''
    }
  },
  created() {
    let id = this.$route.query.id
    if (id) {
      this.form.id = id
      getDetails({
        id
      }).then(response => {
        const { data } = response
        this.form = Object.assign({}, this.form, data)
        this.form.model = 'save'
      }).finally(() => {
        this.loading = false
      })
    } else {
      this.loading = false
    }
  },
  methods: {
    back() {
      this.$confirm('确定离开当前页面？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {})
    },

    saveForm() {
      const that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          updateRecord(this.form).then(response => {
            this.common.notify()
            this.$router.replace('/system/notice')
          }).finally(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
