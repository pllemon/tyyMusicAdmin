<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">师傅列表</p>
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
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column label="姓名" prop="name"/>
          <el-table-column label="身份证" prop="sfz" width="180"/>
          <el-table-column label="手机号" prop="phone" width="120"/>
          <el-table-column label="入行年份" prop="enter_time" width="100"/>
          <el-table-column label="联系地址" prop="address" width="200"/>
          <el-table-column label="个人简介" prop="desc"/>
          <el-table-column label="申请时间" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.display_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="details(scope.row.id, 1)">详情</el-button>
              <el-button type="text" @click="details(scope.row.id, 3)">编辑资料</el-button>
              <el-button type="text" @click="details(scope.row.id, 2)">通过</el-button>
              <el-button type="text" @click="reject(scope.$index)">驳回</el-button>
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
import { getList } from '@/api/master'
import Details from '@/views/master/details'
import Reject from '@/views/master/reject'

export default {
  components: {
    Details,
    Reject
  },
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
      statusOptions: ['未审核', '审核通过', '已驳回'],

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

    details(id, type) {
      this.dialogMes = {
        id: id,
        type: type
      }
      this.currentComponent = 'Details'
    },

    reject(id) {
      this.dialogMes = {
        id: id
      }
      this.currentComponent = 'Reject'
    },
    
  }
}
</script>
