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
        height="300px"
      >
        <el-table-column label="序号" type="index" width="50" fixed/>
        <el-table-column label="收入/支出类型" prop="phone"/>
        <el-table-column label="积分数" prop="phone"/>
        <el-table-column label="记录时间" prop="username"/>
        <el-table-column label="补充说明" prop="username"/>
      </el-table>
    </div>
    <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getList } from '@/api/member'

export default {
  data() {
    return {
      vm: this,

      list: null,
      listLoading: true,
      selectArr: [],

      total: 0,
      queryMes: {
        phone: '',
        username: '',
        friend_name: '',
        is_criaftsman: '',
        is_business: '',
        page: 1,
        limit: 10
      },

      currentComponent: '',
      dialogMes: {}
    }
  },
  computed: {
    ...mapState({
      identityType: state => state.dict.identityType
    })
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.queryMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
