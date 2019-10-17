<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">线上订单列表</p>
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
        <el-form-item label="订单编号" prop="order_sn">
          <el-input type="text" v-model="queryMes.order_sn" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="queryMes.status" placeholder="请选择">
            <el-option
              v-for="(item, index) in orderStatus"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属网点">
          <el-select v-model="queryMes.network_id">
            <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
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
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55" fixed />
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column label="订单编号"  width="160" prop="order_sn" />
          <el-table-column label="订单状态" width="120">
            <template slot-scope="scope">
              {{orderStatus[scope.row.status]}}
            </template>
          </el-table-column>
          <el-table-column label="下单客户" width="200">
            <template slot-scope="scope">
              {{scope.row.phone}}
            </template>
          </el-table-column>
          <el-table-column label="服务需求" prop="service_demand" width="200"/>
          <el-table-column label="服务地址" prop="address" width="200"/>
          <el-table-column label="预约时间" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.appo_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户备注" prop="remark" width="120" />
          <el-table-column label="服务网点"  width="120"/>
          <el-table-column label="承接师傅"  width="120"/>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.order_id)">详情</el-button>
              <el-button type="text" v-if="scope.row.status == 1" @click="common.loadComponent(vm, 2, scope.row.order_id)">审核</el-button>
              <el-button type="text" v-if="scope.row.status == 4" @click="common.loadComponent(vm, 3, scope.row.order_id)">指派</el-button>
              <el-button type="text" v-if="scope.row.status == 3" @click="release(scope.row.order_id)">发布</el-button>
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
import { getList, release } from '@/api/order'
import Details from '@/views/order/details'
import Examine from '@/views/order/examine'
import Appoint from '@/views/order/appoint'

export default {
  components: {
    Details,
    Examine,
    Appoint
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
      dialogMes: {},

      networkList: []
    }
  },
  created() {
    const that = this
    this.vm = this
    this.common.getAllNetwork(this.vm, function(){
      that.fetchData()
    })
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
    },

    selectionChange(val) {
      this.selectArr = val
    },

    // 发布订单
    release(id) {
      this.$confirm('确定发布该订单？发布后该订单将显示在抢单中心，师傅可以进行报名。', '提示', {
        type: 'warning'
      }).then(() => {
        release({
          order_id: id
        }).then(response => {
          this.common.notify()
          this.fetchData()
        })
      })
    },
  },
  computed: {
    ...mapState({
      orderStatus: state => state.dict.orderStatus
    })
  }
}
</script>
