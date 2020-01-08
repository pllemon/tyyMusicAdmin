<template>
<el-dialog :modal-append-to-body="false" title="相关订单" :visible="true" width="1100px" :before-close="handleClose">
  <!-- 表格&分页 -->
  <div class="table-section">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      height="400px"
    >
      <el-table-column label="序号" type="index" width="50" fixed/>
      <el-table-column label="订单编号" prop="order_sn" />
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          {{orderStatus[scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column label="服务需求" prop="service_demand"/>
      <el-table-column label="完成时间" prop="success_time"/>
    </el-table>
  </div>
  <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
</el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { craftsmanorderlist } from '@/api/master'

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

      list: [],
      listLoading: true,

      total: 0,
      queryMes: {},
      timeRange: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      craftsmanorderlist(this.dialogMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleClose() {
      this.$parent.currentComponent = ''
    }
  },
  computed: {
    ...mapState({
      orderStatus: state => state.dict.orderStatus,
    }),
    ...mapGetters(['userInfo'])
  }
}
</script>
