<template>
  <el-dialog :modal-append-to-body="false" :title="dialogMes.id?'编辑':'新增'" :visible="true" width="680px" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px" style="margin: 0 40px">
      <el-form-item label="展示图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="fileChange">
          <img v-if="file.url" :src="file.url" class="avatar" style="width:100%;height:100%">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="链接类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="(item,index) in linkType" :key="index" :label="index">{{ item }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="链接url" prop="url">
        <el-input v-model="form.url" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="排序" prop="orders">
        <el-input v-model="form.orders" placeholder="请输入，数字越大越靠后" />
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
import { getDetails, updateRecord } from '@/api/advert'  

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      file: {},
      form: {
        type: '0',
        url: '',
        orders: ''
      }
    }
  },
  created() {
    if (this.dialogMes.id) {
      this.getDetails()
    }
  },
  methods: {
    fileChange(file) {
      console.log(file)
      this.file = file
    },

    getDetails() {
      getDetails({
        id: this.dialogMes.id
      }).then(response => {
        console.log(response)
      })
    },
    
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitForm() {
      let formData = new FormData()
      formData.append('file', this.file.raw)
      for (let i in this.form) {
        formData.append(i, this.form[i])
      }
      updateRecord(formData).then(response => {
        this.$common.closeComponent()
      })
    },

  },
  
  computed: {
    ...mapState({
      linkType: state => state.dict.linkType
    })
  }
}
</script>

<style scoped lang="scss">
</style>
