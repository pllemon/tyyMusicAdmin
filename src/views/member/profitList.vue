<template>
  <div>
    <div class="table-section">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        height="360px"
      >
        <el-table-column label="序号" type="index" width="50" fixed/>
        <el-table-column label="佣金金额" prop="money"/>
        <el-table-column label="下级用户" prop=""/>
        <el-table-column label="服务项目" prop="service_demand"/>
        <el-table-column label="记录时间" prop="time"/>
      </el-table>
    </div>
    <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userprofit } from '@/api/member'

export default {
  props: {
    id: {
      type: Number,
      default: ''
    }
  },
  data() {
    return {
      vm: this,

      list: null,
      listLoading: true,
      selectArr: [],

      total: 0,
      queryMes: {
        user_id: '',
        page: 1,
        limit: 20
      }
    }
  },
  computed: {
    ...mapState({
      identityType: state => state.dict.identityType
    })
  },
  created() {
    this.queryMes.user_id = this.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      userprofit(this.queryMes).then(response => {
        this.list = response.data.list.data
        this.total = response.data.list.total
      }).finally(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
