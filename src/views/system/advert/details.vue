<template>
  <el-dialog :modal-append-to-body='false' :title="changeType[dialogMes.type]+'广告'" :visible="true" width="680px" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px" style="margin: 0 40px">
      <el-form-item label="展示图片" prop="img">
        <gd-upload width="480" height="250" @success="uploadSuccess"/>
      </el-form-item>
      <el-form-item label="链接类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="(item,index) in linkType" :key="index" :label="index">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="链接url" prop="url">
        <el-input v-model="form.url" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="orders">
        <el-input v-model="form.orders" placeholder="请输入，数字越大越靠后"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { bannerinfo, saveinfo } from '@/api/advert'  

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

    submitForm() {
      console.log(this.form)
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },
  },
  
  computed: {
    ...mapState({
      changeType: state => state.dict.changeType,
      linkType: state => state.dict.linkType
    })
  }
}
</script>

<style scoped lang="scss">
</style>
