<template>
  <el-dialog :modal-append-to-body="false" title="详情" :visible="true" width="1100px" :before-close="handleClose">
    <div class="section detail-form">
      <p class="section-title small">用户信息</p>
      <div class="flex-center">
        <gd-image width="140" height="140" style="margin-left:20px" />
        <el-form class="flex1" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="用户名:">
                {{ info.username }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号:">
                {{ info.phone }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="推荐码:">
                {{ info.invitation_code }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系手机:">
                {{ info.phone }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册时间:">
                {{ info.creattime }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails } from '@/api/member'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      info: {}
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
      user_id: that.dialogMes.id
    }).then(response => {
      that.info = response.data
    })
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
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
</style>
