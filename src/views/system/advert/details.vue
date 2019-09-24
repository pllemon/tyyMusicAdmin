<template>
  <el-dialog :modal-append-to-body='false' :title="changeType[dialogMes.type]+'广告'" :visible="true" width="680px" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px" style="margin: 0 40px">
      <el-form-item label="展示图片" prop="img">
        <gd-upload width="480" height="250" @success="uploadSuccess"/>
      </el-form-item>
      <el-form-item label="链接url" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails, orderexamine } from '@/api/order'  

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {

      }
    }
  },
  methods: {
    uploadSuccess(id) {
      this.form.imglist = id
    },

    onSubmit() {
      console.log(this.form)
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },
  },
  
  computed: {
    ...mapState({
      changeType: state => state.dict.changeType,
      orderStatus: state => state.dict.orderStatus
    })
  }
}
</script>

<style scoped lang="scss">
</style>
