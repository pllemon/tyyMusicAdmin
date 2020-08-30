<template>
  <el-dialog :modal-append-to-body="false" title="详情" :visible="true" width="1100px" :before-close="handleClose">
    <el-tabs tab-position="top">
      <el-tab-pane label="基本信息" style="min-height: 400px;">
        <div class="flex" v-loading="loading">
          <gd-image :src="info.headerurl" headUrl width="80" height="80"/>
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
                <el-form-item label="上级推荐人:">
                  {{ first_friend ? first_friend.username : '无' }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下级推荐码:">
                  {{ info.invitation_code }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下级推荐数:">
                  {{ info.friendnum }}
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
                <el-form-item label="当前佣金:">
                  {{ info.money }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前积分:">
                  {{ sumintegral }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="佣金记录">
        <profit-list :id="dialogMes.id" />
      </el-tab-pane>
      <el-tab-pane label="积分记录">
        <integral-list :id="dialogMes.id" />
      </el-tab-pane>
      <el-tab-pane label="推荐记录">
        <recommend-list v-if="!loading" :invitation_code="info.invitation_code" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails } from '@/api/member'
import IntegralList from '@/views/member/integralList'
import ProfitList from '@/views/member/profitList'
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
    RecommendList,
    ProfitList
  },
  data() {
    return {
      loading: true,
      info: {},
      first_friend: {},
      id: '',
      sumintegral: 0
    }
  },
  computed: {
    ...mapState({
      identityType: state => state.dict.identityType
    })
  },
  created() {
    const that = this
    this.id = this.dialogMes
    getDetails({
      user_id: that.dialogMes.id
    }).then(response => {
      that.info = response.data.userinfo
      that.first_friend = response.data.first_friend
      that.sumintegral = response.data.sumintegral
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

<style scoped lang="scss">
.section{
  margin-bottom: 40px;
  .section-title{
    margin-bottom: 15px;
  }
}

.el-form-item{
  margin-bottom: 0;
}
</style>
