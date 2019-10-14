<template>
  <el-image
    :src="ip + src"
    :style="{width: cWidth + 'px', height: cHeight + 'px'}"
    :preview-src-list="[common.ip + src]"
    fit="cover"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    },
    width: {
      type: [ Number, String ],
      default: 200
    },
    height: {
      type: [ Number, String ],
      default: 120
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cWidth: '',
      cHeight: ''
    }
  },
  created() {
    if (this.small) {
      this.cWidth = this.width/2
      this.cHeight = this.height/2
    } else {
      this.cWidth = this.width
      this.cHeight = this.height
    }
  }
}
</script>

<style lang="scss">
.el-image{
  margin-right: 10px;
}
.title{
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
}
</style>
