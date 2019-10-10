<!-- 异步上传多张图片 -->
<template>
  <div>
    <el-upload
      ref="upload"
      multiple
      list-type="picture-card"
      accept="image/jpg,image/png"
      :action="action"
      :file-list="fileList"
      :auto-upload="false"
      :limit="limit"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-error="handleError"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: ''
    },
    limit: {
      type: [ Number, String ],
      default: 10
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleError(err, file, fileList) {
      this.$message.error(file.name + '上传失败')
    },
    handleChange(file, fileList) {
      this.$emit('change', fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleRemove(file, fileList) {
      this.$emit('update', fileList)
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
</style>
