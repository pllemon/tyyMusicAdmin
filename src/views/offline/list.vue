<template>
  <div class="app-container list-layout">
    <div class="table-content">
      <!-- 搜索 -->
      <div class="search-form">
        <el-form :inline="true" :model="queryMes" size="mini" ref="searchForm">
          <el-form-item label="订单编号" prop="order_sn">
            <el-input type="text" v-model="queryMes.order_sn" placeholder="请输入" />
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
          <el-form-item label="用户号码" prop="user_phone">
            <el-input type="text" v-model="queryMes.user_phone" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="商家名称" prop="business_name">
            <el-input type="text" v-model="queryMes.business_name" placeholder="请输入" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">搜索</el-button>
            <el-button @click="resetSearch()">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="other-action">
          <!-- <el-button size="small" icon="el-icon-upload2" round  @click="exportExcel()">批量导出</el-button> -->
        </div>
      </div>

      <!-- 表格&分页 -->
      <div class="table-section">
        <el-table
          ref="table"
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          height="100%"
        >
          <el-table-column label="序号" type="index" width="50" fixed />
          <el-table-column label="订单编号" min-width="160" prop="order_sn" />
          <el-table-column label="订单状态" min-width="120">
            <template slot-scope="scope">
              <span>{{offlineStatus[scope.row.status]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单用户" min-width="200">
            <template slot-scope="scope">
              <p>{{ scope.row.user_name }} {{ scope.row.user_phone }}</p>
            </template>
          </el-table-column>
          <el-table-column label="服务商家" min-width="220">
            <template slot-scope="scope">
              <p>{{ scope.row.business_name }} {{ scope.row.business_phone }}</p>
              <p>{{ scope.row.business_address }}</p>
            </template>
          </el-table-column>
          <el-table-column label="订单金额" prop="money" width="120" />
          <el-table-column label="积分抵扣" prop="integral" width="120">
            <template slot-scope="scope">
              {{ scope.row.integral | normNumber }}
            </template>
          </el-table-column>
          <el-table-column label="实付款" width="120">
            <template slot-scope="scope">
              {{ (scope.row.money - scope.row.integral) | normNumber }}
            </template>
          </el-table-column>
          <el-table-column label="平台费" prop="pay_money" width="120">
            <template slot-scope="scope">
              {{ scope.row.pay_money | normNumber }}
            </template>
          </el-table-column>
          </el-table-column>
          <el-table-column label="创建时间" width="180" prop="create_time" />
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="loadComponent('Details', scope.row.id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
    </div>

    <!-- 弹窗 -->
    <component :is="currentComponent" :dialogMes="dialogMes"/>

     <!-- 导出 -->
    <form ref="exportForm" action="/admin/businessorderlist" method="post" style="display:none">
      <input name="model" value="exportToExcel" />
      <input v-if="this.queryMes.start_time" name="start_time" :value="this.queryMes.start_time" />
      <input v-if="this.queryMes.end_time" name="end_time" :value="this.queryMes.end_time" />
      <div></div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getList } from '@/api/offline'
import Details from '@/views/offline/details'
import ListMixin from '@/mixin/list'

export default {
  mixins: [ListMixin],
  components: {
    Details
  },
  data() {
    return {
      queryMes: {
        page: 1,
        limit: 20,
        status: '',
        order_sn: '',
        user_phone: '',
        business_name: '',
        start_time: '',
        end_time: ''
      },

      api: {
        getList
      },

      currentComponent: '',
      dialogMes: {}
    }
  },
  created() {
    this.againFetch()
  },
  computed: {
    ...mapState({
      offlineStatus: state => state.dict.offlineStatus
    })
  }
}
</script>
