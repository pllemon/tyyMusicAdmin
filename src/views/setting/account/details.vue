<template>
  <el-dialog :modal-append-to-body='false' :title="changeType[dialogMes.type]+'账号'" :visible="true" width="600px" :before-close="handleClose">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-row>
        <el-col span="24">
          <el-form-item label="账号名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item label="联系电话">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item label="所属网点">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item label="账号角色">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item label="启用状态" prop="enable">
            <el-radio-group v-model="form.enable">
              <el-radio v-for="(item,index) in enableState" :key="index" :label="item" :value="index"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item label="账号备注">
            <el-input v-model="form.name"></el-input>
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
      rules: {
        name: [
          { required: true, message: '请输入账号名', trigger: 'blur' }
        ]
      },
      form: {}
    }
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {

        }
      })
    }
  },
  computed: {
    ...mapState({
      changeType: state => state.dict.changeType,
      enableState: state => state.dict.enableState,
    })
  }
}
</script>

<style scoped lang="scss">

</style>
