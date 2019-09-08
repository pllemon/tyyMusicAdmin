<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">订单列表</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round>批量导出</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
        <el-form-item label="下单时间">
           <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="queryMes.user" placeholder="审批人" />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="queryMes.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData()">搜索</el-button>
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
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55" fixed />
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column label="订单编号" width="100" prop="order_sn" />
          <el-table-column label="下单用户" />
          <el-table-column label="服务需求" prop="service_demand" width="200"/>
          <el-table-column label="服务地址" prop="address" width="200"/>
          <el-table-column label="预约时间" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.appo_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户备注" prop="remark"/>
          <el-table-column label="订单状态" />
          <el-table-column label="承接师傅" />
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="details(scope.row.order_id, 0)">详情</el-button>
              <el-button type="text" @click="details(scope.row.order_id, 1)">审核</el-button>
              <el-button type="text" @click="release(scope.row.order_id)">发布</el-button>
              <el-button type="text" @click="details(scope.row.order_id, 2)">指派</el-button>
              <el-button type="text">取消</el-button>
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
import { getList } from '@/api/order'
import Details from '@/views/order/details'

export default {
  data() {
    return {
      vm: null,

      list: null,
      listLoading: true,
      selectArr: [],

      total: 100,
      queryMes: {
        user: '',
        region: '',
        page: 2,
        limit: 10
      },
      value1: [],

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
      getList().then(response => {
        this.list = response.data
      }).finally(() => {
        this.listLoading = false
      })
    },

    selectionChange(val) {
      this.selectArr = val
    },

    // 订单详情
    details(id, type) {
      this.dialogMes = {
        id: id,
        type: type
      }
      this.currentComponent = 'Details'
    },

    // 发布订单
    release() {
      this.$confirm('确定发布该订单？发布后该订单将显示在抢单中心，师傅可以进行报名。', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发布成功!'
        })
      })
    }
  },
  components: {
    Details
  }
}
</script>
