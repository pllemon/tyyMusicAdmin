<template>
  <el-image
    :src="common.ip + src"
    :style="{width: cWidth + 'px', height: cHeight + 'px'}"
    :preview-src-list="[common.ip + src]"
    :class="{'headUrl': headUrl}"
    fit="cover"
  >
    <div slot="error" class="el-image__error">
      <span v-if="!src && !headUrl">无图片</span>
      <img v-if="!src && headUrl" src="@/assets/image/plac.png" style="width:100%"/>
      <span v-if="src && !headUrl">加载失败</span>
    </div>
  </el-image>
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
    headUrl: {
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

<style lang="scss" scoped>
.el-image{
  margin-right: 10px;
}
.title{
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
}
.headUrl{
  border-radius: 50%;
  margin-right: 0;
  background: #fff;
}
</style>
