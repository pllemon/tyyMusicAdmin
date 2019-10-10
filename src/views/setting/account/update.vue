<template>
  <el-dialog :modal-append-to-body="false" :title="dialogMes.id?'编辑':'新增'" :visible="true" width="680px" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px" style="margin: 0 40px" v-loading="loading">
      <el-form-item label="账号名" prop="url">
        <el-input v-model="form.url" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="账号密码" prop="url">
        <el-input v-model="form.url" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="联系电话" prop="orders">
        <el-input v-model="form.orders" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="所属网点" prop="orders">
        <el-input v-model="form.orders" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="账号角色" prop="orders">
        <el-input v-model="form.orders" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="账号备注" prop="orders">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入"
          v-model="form.dec">
        </el-input>
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
      vm: null,
      loading: true,

      file: {},
      form: {
        type: '0',
        url: '',
        orders: ''
      }
    }
  },  
  computed: {
    ...mapState({
      linkType: state => state.dict.linkType
    })
  },
  created() {
    this.vm = this
    if (this.dialogMes.id) {
      this.getDetails()
    } else {
      this.loading = false
    }
  },
  methods: {
    changeFile(fileList) {
      this.file = fileList[0]
    },

    getDetails() {
      getDetails({
        banner_id: this.dialogMes.id
      }).then(response => {
        let { data } = response
        data.type = data.type.toString()
        data.banner_id = data.id
        this.file.url = this.common.ip + data.imgurl
        this.form = data
        this.loading = false
      })
    },
    
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitForm() {
      let formData = null;
      if (this.file.raw) {
        formData = new FormData()
        formData.append('file', this.file.raw)
        for (let i in this.form) {
          formData.append(i, this.form[i])
        }
      } else {
        formData = this.form
      }
      
      let type = this.form.id ? '2' : '1'
      updateRecord(formData, type).then(response => {
        this.common.closeComponent(this.vm)
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
