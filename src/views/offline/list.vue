<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">线下订单列表</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round>批量导出</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
        <el-form-item label="预约时间">
           <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="queryMes.status" placeholder="请选择">
            <el-option
              v-for="(item, index) in offlineStatus"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号" prop="order_sn">
          <el-input type="text" v-model="queryMes.order_sn" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="common.search(vm)">搜索</el-button>
          <el-button @click="common.resetSearch(vm)">重置</el-button>
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
        >
          <el-table-column label="序号" type="index" width="50" fixed />
          <el-table-column label="订单编号" width="160" prop="order_sn" />
          <el-table-column label="订单状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.pay_status == 0">待商家确认</span>
              <span v-if="scope.row.pay_status == 1">已完成</span>
              <span v-if="scope.row.status == 2">已取消</span>
            </template>
          </el-table-column>
          <el-table-column label="下单用户" width="200">
            <template slot-scope="scope">
              <p>{{ scope.row.user_name }} {{ scope.row.user_phone }}</p>
            </template>
          </el-table-column>
          <el-table-column label="服务商家" width="220">
            <template slot-scope="scope">
              <p>{{ scope.row.business_name }} {{ scope.row.business_phone }}</p>
              <p>{{ scope.row.business_address }}</p>
            </template>
          </el-table-column>
          <el-table-column label="总消费金额" prop="money" width="120" />
          <el-table-column label="用户积分抵扣" prop="integral" width="120">
            <template slot-scope="scope">
              {{ scope.row.integral | normNumber }}
            </template>
          </el-table-column>
          <el-table-column label="线下支付金额" width="120">
            <template slot-scope="scope">
              {{ (scope.row.money - scope.row.integral) | normNumber }}
            </template>
          </el-table-column>
          <el-table-column label="平台费" prop="pay_money" width="120">
            <template slot-scope="scope">
              {{ scope.row.pay_money | normNumber }}
            </template>
          </el-table-column>
          <el-table-column label="积分抵扣平台费" prop="use_integral" width="120">
            <template slot-scope="scope">
              {{ scope.row.use_integral | normNumber }}
            </template>
          </el-table-column>
          <el-table-column label="用户积分返还" prop="return_integral" width="120">
            <template slot-scope="scope">
              {{ scope.row.return_integral | normNumber }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.creat_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.id)">详情</el-button>
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
import { getList } from '@/api/offline'
import Details from '@/views/offline/details'

export default {
  components: {
    Details
  },
  data() {
    return {
      vm: null,

      list: [],
      listLoading: true,
      selectArr: [],

      total: 0,
      queryMes: {
        page: 1,
        limit: 10,
        status: '',
        order_sn: ''
      },
      timeRange: [],

      currentComponent: '',
      dialogMes: {}
    }
  },
  created() {
    this.vm = this
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
  },
  computed: {
    ...mapState({
      offlineStatus: state => state.dict.offlineStatus
    })
  }
}
</script>
