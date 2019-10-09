<template>
  <el-dialog :modal-append-to-body="false" :title="dialogMes.id?'编辑':'新增'" :visible="true" width="800px" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px">
      <el-form-item label="网点名称：" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="所属区域：" prop="region">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="负责人：" prop="author">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="网点地址：" prop="address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="网点描述：" prop="desc">
        <el-input
          v-model="form.desc"
          type="textarea"
          :autosize="{ minRows: 6}"
          placeholder="请输入"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
import { getDetails, updateRecord } from '@/api/network'  

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: '请输入网点名称', trigger: 'blur' }],
        region: [{ required: true, message: '请选择所属区域', trigger: 'change' }],
        author: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        address: [{ required: true, message: '请输入网点地址', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入网点描述', trigger: 'blur' }],
      },
      orderInfo: {}
    }
  },

  created() {
    this.getDetails()
  },

  methods: {
    getDetails() {
      getDetails({
        network_id: this.dialogMes.id
      }).then(response => {
        this.form = response.data
      })
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submit() {
      let that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          if (that.form.id) {
            that.form.model = 'saveinfo'
            that.form.network_id = that.form.id
          }
          updateRecord(that.form).then(response => {
            that.common.closeComponent(that)
          })
        }
      })
    }
  },
  computed: {
    ...mapState({
      changeType: state => state.dict.changeType
    })
  }
}
</script>