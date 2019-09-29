<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      accept="image/jpeg,image/jpg,image/png"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
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
    action: {
      type: String,
      default: '/admin/uploadordersimg'
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
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.imageUrl = 'http://47.106.100.144/' + res.data.imgurl
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
    text-align: center;
  }
  .avatar {
    display: block;
  }
}
.upload-tips{
  margin-top: 10px;
  text-align: center;
}
</style>
