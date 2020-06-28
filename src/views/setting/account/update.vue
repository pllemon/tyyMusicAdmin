<template>
  <el-dialog :modal-append-to-body="false" :title="dialogMes.id?'编辑':'新增'" :visible="true" width="600px" :before-close="handleClose" :close-on-click-modal="false">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="loading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="账号名" prop="username">
            <el-input v-model="form.username" :disabled="dialogMes.id !== ''" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="密码" prop="password" v-if="!dialogMes.id">
            <el-input v-model="form.password" type="password" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" clearable />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="24">
          <el-form-item label="账号角色" prop="role">
            <el-select v-model="form.role" @change="changeRole" clearable>
              <el-option v-for="(item, index) in roleType" :key="index" :label="item" :value="index" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="24" v-if="form.role == 2">
          <el-form-item label="所属网点" prop="network_id" clearable>
            <el-select v-model="form.network_id">
              <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="账号备注">
            <el-input v-model="form.remark" type="textarea" :rows="2" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails, updateRecord } from '@/api/account'
import { getNetworkList } from '@/api/network'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      vm: this,
      loading: true,
      rules: {
        username: [{ required: true, message: '请输入账号名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        // network_id: [{ required: true, message: '请选择所属网点', trigger: 'change' }],
        // role: [{ required: true, message: '请选择账号角色', trigger: 'change' }],
      },
      form: {
        network_id: 0,
        remark: '',
        role: 1
      },
      networkList: []
    }
  },
  computed: {
    ...mapState({
      roleType: state => state.dict.roleType
    })
  },
  created() {
    this.common.getAllNetwork(this)
    if (this.dialogMes.id) {
      this.getDetails()
    } else {
      this.loading = false
    }
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    changeRole(val) {
      if (val != 2) {
        this.form.network_id = ''
      }
    },

    getDetails() {
      getDetails({
        admin_id: this.dialogMes.id
      }).then(response => {
        const { data } = response
        if (data.role) {
          data.role = data.role.toString()
        }
        this.form = data
      }).finally(() => {
        this.loading = false
      })
    },

    submit() {
      const that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (that.dialogMes.id) {
            that.form.password = ''
            that.form.admin_id = that.form.id
          }
          that.loading = true
          updateRecord(that.form).then(response => {
            that.common.closeComponent(that)
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

</style>
