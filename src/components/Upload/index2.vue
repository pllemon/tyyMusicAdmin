<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :auto-upload="autoUpload"
      :list-type="listType"
      :accept="accept"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-change="uploadChange"
    >
      <i slot="default" class="el-icon-plus"></i>
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
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    accept: {
      type: String,
      default: 'image/jpeg,image/jpg,image/png'
    },
    width: {
      type: [ Number, String ],
      default: 150
    },
    height: {
      type: [ Number, String ],
      default: 150
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  created() {
    this.fileList = list
  },
  methods: {
    uploadChange(file, fileList) {
      console.log(fileList)
    },
    uploadSuccess(res, file) {
      if (res.success) {
        this.imageUrl = this.common.ip + res.data.imgurl
        this.$emit('success', res.data.id)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
