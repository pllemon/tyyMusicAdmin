<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">网点管理</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round @click="common.loadComponent(vm, 1)">添加</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
        <el-form-item label="账号名">
          <el-input v-model="queryMes.user" />
        </el-form-item>
        <el-form-item label="所属网点">
          <el-select v-model="queryMes.region">
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
          <el-table-column label="一级网点" />
          <el-table-column label="二级网点" />
          <el-table-column label="联系人" />
          <el-table-column label="联系电话" />
          <el-table-column label="网点地址" />
          <el-table-column label="启用状态" width="100">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.appo_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="网点备注" prop="remark"/>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.id)">详情</el-button>
              <el-button type="text" @click="common.loadComponent(vm, 1, scope.row.id)">编辑</el-button>
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
import { getList, enableRecord, removeRecord } from '@/api/network'
import Details from '@/views/setting/network/details'
import Update from '@/views/setting/network/update'

export default {
  components: {
    Details,
    Update
  },
  data() {
    return {
      vm: null,

      list: null,
      listLoading: false,
      selectArr: [],

      total: 100,
      queryMes: {
        user: '',
        region: '',
        page: 2,
        limit: 10
      },

      currentComponent: '',
      dialogMes: {}
    }
  },
  created() {
    this.vm = this
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

    remove(id) {
      this.common.removeRecord(this.vm, {id}, removeRecord)
    }
  }
}
</script>
