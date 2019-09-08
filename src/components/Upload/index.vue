<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="/admin/uploadordersimg"
      accept="image/jpeg,image/jpg,image/png"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <p class="upload-tips">{{tip}}</p>
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.imageUrl = 'http://192.168.1.104/uploads/orders/' + res.data.imgurl
        this.$emit('success', res.data.id)
      }
    }
  }
}
</script>

<style lang="scss">
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.upload-tips{
  margin-top: 10px;
  text-align: center;
}
</style>
