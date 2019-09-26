<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">联系我们</p>
    </div>

    <div class="table-content">
      <tinymce v-model="content" :height="300" />
      <el-button @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
     content: ''
    }
  },
  created() {
  },

  save() {
    console.log(this.content)
  }
}
</script>
