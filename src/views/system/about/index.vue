<template>
  <div class="app-container list-layout" v-loading="loading">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">企业文化</p>
      <div class="action">
        <el-button size="small" icon="el-icon-document-checked" round @click="saveForm()">保存</el-button>
      </div>
    </div>

    <div class="table-content" style="overflow: auto">
      <tinymce 
        v-model="content" 
        :toolbar="[]"
        :height="400" 
      />
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
      loading: true,
      model: 'add',
      content: '',
      id: ''
    }
  },
  created() {
    getdoc({type: 'about'}).then(response => {
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
        type: 'about',
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
