<template>
  <div class="app-container list-layout" v-loading="loading">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">平台通知</p>
      <div class="action">
        <el-button size="small" icon="el-icon-document-checked" round @click="saveForm()">保存</el-button>
      </div>
    </div>

    <div class="table-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px" v-loading="loading">
        <el-row>
          <el-col :span="16">
            <el-form-item label="通知标题:" prop="sn">
              <el-input type="text" v-model="form.sn" disabled/>
            </el-form-item>
            <el-form-item label="通知内容:" prop="sn">
              <tinymce v-model="content" :toolbar="[]" :height="400" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通知用户:" prop="sn">
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { setdoc, getdoc } from '@/api/setting'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {},
      loading: true,
      model: 'add',
      content: '',
      id: ''
    }
  },
  created() {
    getdoc({type: 'xttz', model: 'list'}).then(response => {
      const { data } = response
      if (data && data.id) {
        this.content = data.dec
        this.model = 'save'
        this.id = data.id
      }
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    saveForm() {
      if (this.content == '') {
        this.$message.error('请输入内容');
        return false
      }
      this.loading = true
      setdoc({
        model: this.model,
        dec: this.content,
        id: this.id,
        type: 'xttz',
        is_show: 1
      }).then(response => {
        this.common.notify()
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
