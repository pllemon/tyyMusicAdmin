<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">师傅月结工资</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round>批量导出</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
        <el-form-item label="结算月份" prop="mon">
          <el-date-picker
            v-model="queryMes.mon"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结算状态" prop="status">
          <el-select v-model="queryMes.status" placeholder="请选择">
            <el-option
              v-for="(item, index) in settleStauts"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="师傅名" prop="name">
          <el-input v-model="queryMes.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="师傅编号" prop="sn">
          <el-input v-model="queryMes.sn" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
          <el-button @click="resetSearch()">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格&分页 -->
      <div class="table-section">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          height="100%"
          @selection-change="selectionChange"
        >
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column label="头像" align="center">
            <template slot-scope="scope">
              <gd-image :src="scope.row.headerurl" headUrl width="40" height="40"/>
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="sn"/>
          <el-table-column label="姓名" prop="name"/>
          <el-table-column label="身份证" prop="sfz" width="180"/>
          <el-table-column label="手机号" prop="phone" width="120"/>
          <el-table-column label="结算月份" prop="time" width="100">
            <template slot-scope="scope">
              {{scope.row.time.slice(0, 7)}}
            </template>
          </el-table-column>
          <el-table-column label="完成订单数" prop="order_num" min-width="120"/>
          <el-table-column label="应发工资" prop="money"/>
          <el-table-column label="结算状态">
            <template slot-scope="scope">
              {{ settleStauts[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column label="结算日期" width="200" prop="pay_time" />
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="surePay(scope.row.id, 0)">标记为已处理</el-button>
              <el-button type="text" @click="surePay(scope.row.id, 1)">标记为未处理</el-button> -->
              <el-button type="text" @click="showOrder(scope.row)">相关订单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
    </div>

    <!-- 弹窗 -->
    <component :is="currentComponent" :dialogMes="dialogMes"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { craftsmansettlementlist, craftsmansettlement } from '@/api/master'
import Orders from '@/views/master/orders'

export default {
  components: {
    Orders
  },
  data() {
    return {
      vm: this,

      list: null,
      listLoading: true,
      selectArr: [],

      total: 0,
      queryMes: {
        mon: '',
        page: 1,
        limit: 10,
        status: '',
        name: '',
        sn: ''
      },
      statusOptions: ['未审核', '审核通过', '已驳回'],

      currentComponent: '',
      dialogMes: {}
    }
  },
  created() {
    this.queryMes.mon = this.$moment().format("YYYY-MM")
    this.fetchData()
  },
  methods: {
    search() {
      this.queryMes.page = 1
      this.fetchData()
    },
    resetSearch() {
      this.$refs.searchForm.resetFields()
      this.queryMes.page = 1
      this.queryMes.limit = 10
      this.queryMes.mon = this.$moment().format("YYYY-MM")
      this.fetchData()
    },

    surePay(id, status) {
      
    },

    showOrder(row) {
      this.dialogMes = {
        mon: row.time.split(' ')[0],
        craftsman_id: row.craftsman_id,
        status: 1,
        page: 1,
        limit: 10
      }
      this.currentComponent = 'Orders'
    },

    fetchData() {
      this.listLoading = true
      craftsmansettlementlist(this.queryMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },

    selectionChange(val) {
      this.selectArr = val
    }
  },
  computed: {
    ...mapState({
      settleStauts: state => state.dict.settleStauts
    })
  }
}
</script>
