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
        <el-form-item label="申请月份" prop="month">
          <el-date-picker
            v-model="queryMes.month"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核状态" prop="status">
          <el-select v-model="queryMes.status" placeholder="请选择">
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="师傅名">
          <el-input v-model="queryMes.user" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="师傅编号">
          <el-input v-model="queryMes.user" placeholder="请输入" />
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
          <el-table-column type="selection" width="55" fixed />
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column label="工号" prop="sn"/>
          <el-table-column label="姓名" prop="name"/>
          <el-table-column label="头像" prop="name"/>
          <el-table-column label="身份证" prop="sfz" width="180"/>
          <el-table-column label="手机号" prop="phone" width="120"/>
          <el-table-column label="结算月份" prop="enter_time" width="100"/>
          <el-table-column label="完成订单数" prop="enter_time" width="100"/>
          <el-table-column label="应发工资" prop="money" width="200"/>
          <el-table-column label="结算状态" width="100">
            <template slot-scope="scope">
              {{ recordStatus[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column label="结算日期" width="200" prop="pay_time" />
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="surePay(scope.row.id, 0)">确定已发</el-button>
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
import Details from '@/views/master/details'
import Examine from '@/views/master/examine'

export default {
  components: {
    Details,
    Examine
  },
  data() {
    return {
      vm: this,

      list: null,
      listLoading: true,
      selectArr: [],

      total: 0,
      queryMes: {
        // month: '',
        page: 1,
        limit: 10
      },
      statusOptions: ['未审核', '审核通过', '已驳回'],

      currentComponent: '',
      dialogMes: {}
    }
  },
  created() {
    // this.queryMes.month = this.$moment().format("YYYY-MM")
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
      this.queryMes.month = this.$moment().format("YYYY-MM")
      this.fetchData()
    },

    surePay() {

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
      recordStatus: state => state.dict.recordStatus
    })
  }
}
</script>
