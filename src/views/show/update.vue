<template>
  <el-dialog :modal-append-to-body="false" :title="dialogMes.id?'编辑':'新增'" :visible="true" width="860px" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px" v-loading="loading">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6}"
          placeholder="请输入"
          v-model="form.dec"
        />
      </el-form-item>
      <el-form-item label="相关照片：" required>
        <gd-upload-multiple ref="upload" action="/admin/uploadordershow" :limit="3" :fileList="fileList" @update="updateUpload" @change="changeUpload"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails, updateRecord } from '@/api/show'
import GdUploadMultiple from '@/components/Upload/index3'

export default {
  components: {
    GdUploadMultiple
  },
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: true,
      fileList: [],

      form: {
        title: '',
        dec: '',
        imglist: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },
      orderInfo: {},
      isSubmit: false
    }
  },

  created() {
    if (this.dialogMes.id) {
      this.getDetails()
    } else {
      this.loading = false
    }
  },

  methods: {
    changeUpload(fileList) {
      this.fileList = fileList

      let uploadRes = this.fileList.every(item => item.status == "success")
      if (uploadRes && this.isSubmit) {
        this.submitForm()
      }
    },
    updateUpload(fileList) {
      this.fileList = fileList
    },

    getDetails() {
      let that = this
      getDetails({
        show_id: that.dialogMes.id
      }).then(response => {
        let { data } = response
        let fileList = []
        if (data.imgurl1) {
          fileList.push({
            name: 'imgurl1',
            response: {
              data: data.imgurl1
            },
            url: that.common.ip + data.imgurl1
          })
        }
        if (data.imgurl2) {
          fileList.push({
            name: 'imgurl2',
            response: {
              data: data.imgurl2
            },
            url: that.common.ip + data.imgurl2
          })
        }
        if (data.imgurl3) {
          fileList.push({
            name: 'imgurl3',
            response: {
              data: data.imgurl3
            },
            url: that.common.ip + data.imgurl3
          })
        }
        if (data.imgurl4) {
          fileList.push({
            name: 'imgurl4',
            response: {
              data: data.imgurl4
            },
            url: that.common.ip + data.imgurl4
          })
        }
        console.log(fileList)
        data.show_id = data.id
        data.savestatus = 2
        that.fileList = fileList
        that.form = data
        that.loading = false
      })
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitUpload() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let uploadRes = this.fileList.every(item => item.status == "success")
          if (uploadRes) {
            this.submitForm()
          } else {
            this.isSubmit = true
            this.$refs.upload.$refs.upload.submit()
          }
        } else {
          return false;
        }
      })
    },

    submitForm() {
      let that = this
      let imglist = ''
      that.fileList.forEach((item, index) => {
        if (index == this.fileList.length - 1) {
          imglist += item.response.data
        } else {
          imglist += item.response.data + ','
        }
      })
      this.form.imglist = imglist
      updateRecord(that.form).then(response => {
        that.common.closeComponent(that)
      })
    }
  },
  computed: {
    ...mapState({
      orderStatus: state => state.dict.orderStatus
    })
  }
}
</script>