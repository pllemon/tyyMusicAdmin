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
      <el-form-item label="负责人：" prop="personal">
        <el-input v-model="form.personal" />
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="网点地址：" prop="address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="网点描述" prop="dec">
        <el-input
          v-model="form.dec"
          type="textarea"
          :autosize="{ minRows: 6}"
          placeholder="请输入"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitExamine">确 定</el-button>
    </span>
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
      form: {},
      rules: {
        name: [{ required: true, message: '请输入网点名称', trigger: 'blur' }],
        region: [{ required: true, message: '请选择所属区域', trigger: 'change' }]
      },
      orderInfo: {}
    }
  },

  created() {
  
  },

  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitExamine() {
      let that = this
      that.$refs.form.validate((valid) => {
        if (valid) {
          orderexamine(that.form).then(response => {
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