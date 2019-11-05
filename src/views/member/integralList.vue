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
        <el-table-column label="积分数" prop="integral"/>
        <el-table-column label="记录时间" prop="time"/>
        <el-table-column label="记录说明" prop="remark"/>
      </el-table>
    </div>
    <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userintegrallist } from '@/api/member'

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
        limit: 10
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
      userintegrallist(this.queryMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
