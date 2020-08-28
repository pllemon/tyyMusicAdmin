<template>
  <el-dialog :modal-append-to-body="false" title="详情" :visible="true" width="1100px" :before-close="handleClose">
    <div class="section detail-form" v-loading="loading">
      <div class="flex">
        <gd-image :src="info.headerurl" headUrl width="80" height="80" style="margin-left:20px"/>
        <el-form class="flex1" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="师傅工号:">
                {{ info.sn ? info.sn : '无' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="师傅姓名:">
                {{ info.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证:">
                {{ info.sfz }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系手机:">
                {{ info.phone }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入行年份:">
                {{ info.enter_time }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属区域:">
                {{ info.areacodename }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="身份证照:">
                <gd-image :src="info.caridimg" width="200" height="120"/>
                <gd-image :src="info.caridzimg" width="200" height="120"/>
                <gd-image :src="info.caridfimg" width="200" height="120"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系地址:">
                {{ info.address }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="个人简介:">
                {{ info.desc }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间:">
                {{ info.create_time }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核时间:">
                {{ info.examine_time }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="账号状态:">
                {{ recordStatus[info.status] }}
                <span v-show="info.status == 3 && info.reject_reason">（{{ info.reject_reason }}）</span>
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
import { getDetails } from '@/api/master'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      info: {},
      loading: true
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
    that.loading = true
    getDetails({
      id: that.dialogMes.id
    }).then(response => {
      that.info = response.data.info
    }).finally(() => {
      that.loading = false
    })
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    }
  }
}
</script>
