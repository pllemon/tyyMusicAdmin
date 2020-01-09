<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">用户提现申请</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round>批量导出</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
        <el-form-item label="申请时间">
           <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="商家名称" prop="name">
          <el-input v-model="queryMes.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="申请状态" prop="status">
          <el-select v-model="queryMes.status" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in cashInStatus"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
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
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55" fixed />
          <el-table-column label="序号" type="index" width="50" fixed />
          <el-table-column label="店铺名" prop="name" width="120" />
          <el-table-column label="联系方式" prop="phone" width="120" />
          <el-table-column label="店铺地址" prop="address" min-width="200"/>
          <el-table-column label="提现积分" prop="money" />
          <el-table-column label="申请时间" width="200" prop="time" />
          <el-table-column label="申请状态" min-width="100">
            <template slot-scope="scope">
              {{ cashInStatus[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column label="处理时间" width="200" prop="examine" />
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.id)">备注</el-button> -->
              <!-- <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.id)">已处理</el-button> -->
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
import { businesscashinlist } from '@/api/businessman'
import Details from '@/views/businessman/details'
import Examine from '@/views/businessman/examine'

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
        page: 1,
        limit: 10,
        start_time: '',
        end_time: '',
        name: '',
        status: ''
      },
      timeRange: [],

      currentComponent: '',
      dialogMes: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      if (this.timeRange && this.timeRange.length) {
        this.queryMes.start_time = this.timeRange[0]
        this.queryMes.end_time = this.timeRange[1]
      } else {
        this.queryMes.start_time = ''
        this.queryMes.end_time = ''
      }
      businesscashinlist(this.queryMes).then(response => {
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
      cashInStatus: state => state.dict. cashInStatus
    })
  }
}
</script>
