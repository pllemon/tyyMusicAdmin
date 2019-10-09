<template>
  <el-dialog :modal-append-to-body="false" title="查看" :visible="true" width="1100px" :before-close="handleClose">
    <div class="section detail-form">
      <p class="section-title small">用户信息</p>
      <div class="flex-center">
        <gd-image width="140" height="140" style="margin-left:20px" />
        <el-form class="flex1" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="用户账号:">
                {{ masterInfo.sn }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户名:">
                {{ masterInfo.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证:">
                {{ masterInfo.sfz }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系手机:">
                {{ masterInfo.phone }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入行年份:">
                {{ masterInfo.enter_time }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间:">
                {{ masterInfo.create_time }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系地址:">
                {{ masterInfo.address }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="个人简介:">
                {{ masterInfo.desc }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核时间:">
                {{ masterInfo.examine_time }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="审核结果:">
                {{ recordStatus[masterInfo.status] }}
                <span v-show="masterInfo.reject_reason">（{{ masterInfo.reject_reason }}）</span>
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
      masterInfo: {}
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
      that.masterInfo = response.data.info
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
