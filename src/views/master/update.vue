<template>
  <el-dialog :modal-append-to-body="false" title="编辑" :visible="true" width="800px" :before-close="handleClose" :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px" v-loading="loading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="师傅头像:">
            <gd-upload 
              v-if="!loading"
              action='admin/uploadcmauthorurl'
              :file="file"  
              @success="uploadSuccess"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="师傅工号:" prop="sn">
            <el-input type="text" v-model="form.sn" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="师傅姓名:" prop="name">
            <el-input type="text" v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="身份证:" prop="sfz">
            <el-input type="text" v-model="form.sfz" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系手机:" prop="phone">
            <el-input type="text" v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="入行年份:" prop="enter_time">
            <el-input type="text" v-model="form.enter_time" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系地址:" prop="address">
            <el-input type="text" v-model="form.address" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="个人简介:">
            <el-input type="textarea" :rows="4" v-model="form.desc" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails, savecraftsmaninfo } from '@/api/master'

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
      loading: true,
      form: {},
      rules: {
        sn: [{ required: true, message: '请填写师傅工号', trigger: 'blur' }],
        name: [{ required: true, message: '请填写师傅姓名', trigger: 'blur' }],
        sfz: [{ required: true, message: '请填写身份证', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系手机', trigger: 'blur' }],
        enter_time: [{ required: true, message: '请填写入行年份', trigger: 'blur' }],
        address: [{ required: true, message: '请填写联系地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({
      changeType: state => state.dict.changeType,
      recordStatus: state => state.dict.recordStatus
    })
  },
  created() {
    const that = this
    getDetails({
      id: that.dialogMes.id
    }).then(response => {
      const { data } = response
      if (data.info.headerurl) {
        that.$set(that.file, 'url', this.common.ip + data.info.headerurl)
      } else {
        that.$set(that.file, 'url', require('@/assets/image/plac.png'))
      }
      that.form = data.info
    }).finally(() => {
      that.loading = false
    })
  },
  methods: {
    uploadSuccess(data) {
      this.form.headerurl = data
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitForm() {
      const that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          that.loading = true
          savecraftsmaninfo(that.form).then(response => {
            that.common.closeComponent(this)
          }).finally(() => {
            that.loading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.section{
  margin-bottom: 40px;
  .section-title{
    margin-bottom: 15px;
  }
}
.order-mes{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 33.33%;
    margin-bottom: 15px;
    box-sizing: border-box;
    font-weight: bold;
    label{
      margin-bottom: 5px;
      display: block;
      font-weight: normal;
    }
  }
}

.master-list{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 32%;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    line-height: 1.5;
    margin-right: 2%;
    padding: 10px;
    box-sizing: border-box;
    &:nth-of-type(3n){
      margin-right: 0;
    }
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      background: #f2f2f2;
    }
  }
}
</style>
