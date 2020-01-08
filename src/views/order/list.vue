<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">线上订单列表</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round  @click="common.exportExcel(vm)">批量导出</el-button>
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
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="common.timePickerOptions()">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单编号" prop="order_sn">
          <el-input type="text" v-model="queryMes.order_sn" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="queryMes.status" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in orderStatus"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属网点" prop="network_id" v-if="!userInfo.network_id">
          <el-select v-model="queryMes.network_id">
            <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="下单用户号码" prop="phone">
          <el-input type="text" v-model="queryMes.phone" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="接单师傅号码" prop="cmphone">
          <el-input type="text" v-model="queryMes.cmphone" placeholder="请输入"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="common.search(vm)">搜索</el-button>
          <el-button @click="timeRange=[];common.resetSearch(vm)">重置</el-button>
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
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column label="订单编号"  width="160" prop="order_sn" />
          <el-table-column label="订单状态" width="120">
            <template slot-scope="scope">
              {{orderStatus[scope.row.status]}}
            </template>
          </el-table-column>
          <el-table-column label="下单客户" width="200">
            <template slot-scope="scope">
              <p>{{scope.row.username}}</p> 
              <p>{{scope.row.phone}}</p>
            </template>
          </el-table-column>
          <el-table-column label="服务需求" prop="service_demand" width="200"/>
          <el-table-column label="服务地址" prop="address" width="200"/>
          <el-table-column label="预约时间"  prop="appo_time" width="180" />
          <el-table-column label="用户备注" prop="remark" width="120" />
          <el-table-column label="服务网点" prop="networkname" width="120" />
          <el-table-column label="承接师傅"  width="200">
            <template slot-scope="scope">
              <p>{{scope.row.cmname}}</p> 
              <p>{{scope.row.cmphone}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="create_time" width="180" />
          <el-table-column label="操作" width="160" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.order_id)">详情</el-button>
              <el-button type="text" @click="common.loadComponent(vm, 1, scope.row.order_id)">审核</el-button>
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

    <!-- 导出 -->
    <form ref="exportForm" action="/admin/orderlist" method="post" style="display:none">
      <input name="model" value="exportToExcel" />
      <input v-if="this.timeRange" name="start_time" :value="this.timeRange[0]" />
      <input v-if="this.timeRange" name="end_time" :value="this.timeRange[1]" />
      <div></div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { getList, release } from '@/api/order'
import Details from '@/views/order/details'
import Examine from '@/views/order/examine'
import Appoint from '@/views/order/appoint'
import Update from '@/views/order/update'

export default {
  components: {
    Details,
    Examine,
    Appoint,
    Update
  },
  data() {
    return {
      vm: this,

      list: [],
      listLoading: true,

      total: 0,
      queryMes: {
        page: 1,
        limit: 10,
        status: '',
        order_sn: '',
        start_time: '',
        end_time: '',
        network_id: '',
        phone: '',
        cmphone: ''
      },
      timeRange: [],

      currentComponent: '',
      dialogMes: {},

      networkList: []
    }
  },
  watch: {
    '$route'(to, from) {
      this.againFetch()
    }
  },
  created() {
    const that = this
    this.common.getAllNetwork(this, function(){
      that.againFetch()
    })
  },
  methods: {
    againFetch() {
      let that = this
      that.queryMes =  {
        page: 1,
        limit: 10,
        status: '',
        order_sn: '',
        start_time: '',
        end_time: '',
        network_id: '',
        phone: '',
        cmphone: ''
      }
      that.timeRange = []
      let query = that.$route.query
      for (let i in query) {
        if (i) {
          that.queryMes[i] = query[i]
        }
      }
      if (query.network_id) {
        this.queryMes.network_id = parseInt(query.network_id)
      }
      if (query.start_time && query.end_time) {
        that.timeRange = [query.start_time, query.end_time]
      } 
      that.fetchData()
    },

    fetchData() {
      this.listLoading = true
      if (this.timeRange && this.timeRange.length) {
        this.queryMes.start_time = this.timeRange[0]
        this.queryMes.end_time = this.timeRange[1]
      } else {
        this.queryMes.start_time = ''
        this.queryMes.end_time = ''
      }
      if (this.userInfo.network_id) {
        this.queryMes.network_id = this.userInfo.network_id
      }
      getList(this.queryMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
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
      orderStatus: state => state.dict.orderStatus,
    }),
    ...mapGetters(['userInfo'])
  }
}
</script>
