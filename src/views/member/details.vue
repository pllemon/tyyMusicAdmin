<template>
  <el-dialog :modal-append-to-body="false" title="详情" :visible="true" width="1100px" :before-close="handleClose">
    <div class="section detail-form">
      <p class="section-title small">基本信息</p>
      <div class="flex-center">
        <gd-image :src="info.headerurl" headUrl width="100" height="100"/>
        <el-form class="flex1" label-width="100px">
          <el-row> 
            <el-col :span="8">
              <el-form-item label="用户账号:">
                {{ info.phone }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户名:">
                {{ info.username }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册时间:">
                {{ info.creattime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="推荐码:">
                {{ info.invitation_code }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上级推荐人:">
                {{ info.friend_name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下级推荐数:">
                {{ info.friend_sum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账号状态:">
                {{ identityType[info.status] }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="师傅状态:">
                {{ identityType[info.is_criaftsman] }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商家状态:">
                {{ identityType[info.is_business] }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总积分:">
                {{ info.creattime }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="section detail-form">
      <p class="section-title small">积分记录</p>
      <integral-list />
    </div>
    <div class="section detail-form">
      <p class="section-title small">推荐记录</p>
      <recommend-list />
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails } from '@/api/member'
import IntegralList from '@/views/member/integralList'
import RecommendList from '@/views/member/recommendList' 

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    IntegralList,
    RecommendList
  },
  data() {
    return {
      info: {}
    }
  },
  computed: {
    ...mapState({
      identityType: state => state.dict.identityType
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
