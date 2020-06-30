<template>
  <div class="app-container list-layout" v-loading="loading">
    <div class="table-content" style="overflow: auto">
      <div class="search-form">
        <el-form></el-form>
        <div class="other-action">
          <el-button size="mini" icon="el-icon-document-checked" round @click="saveForm()">保存</el-button>
        </div>
      </div>
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
    getdoc({type: 'hhxy'}).then(response => {
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
        type: 'hhxy',
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
