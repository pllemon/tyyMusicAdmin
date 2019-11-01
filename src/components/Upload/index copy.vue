<template>
  <div class="gd-upload">
    <el-upload
      class="avatar-uploader"
      list-type="picture-card"
      :action="action"
      :auto-upload="autoUpload"
      accept="image/jpg,image/png"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" :style="{ width: width + 'px', height: height + 'px'}">
      <i v-else class="el-icon-plus avatar-uploader-icon" :style="{ width: width + 'px', height: height + 'px', lineHeight: height + 'px' }"></i>
    </el-upload>
    <p class="upload-tips" v-if="tip">{{tip}}</p>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: () => {}
    },
    action: {
      type: String,
      default: '/admin/uploadordersimg'
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    tip: {
      type: String,
      default: ''
    },
    width: {
      type: [ Number, String ],
      default: 150
    },
    height: {
      type: [ Number, String ],
      default: 150
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  created() {
    this.imageUrl = this.file.url
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file)
      console.log(fileList)
      this.imageUrl = file.url
      this.$emit('change', fileList)
    },

    handleSuccess(res, file) {
      if (res.success) {
        this.$emit('success', res.data.id)
      }
    }
  }
}
</script>

<style lang="scss">
.gd-upload{
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 12px;
    &:hover {
      border-color: #409EFF;
    }
    &.el-upload--picture-card{
      width: auto;
      height: auto;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      text-align: center;
    }
    .avatar {
      display: block;
    }
  }
}

.upload-tips{
  margin-top: 10px;
  text-align: center;
}
</style>
