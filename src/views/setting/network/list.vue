<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">网点管理</p>
      <div class="action">
        <el-button size="small" icon="el-icon-plus" round @click="common.loadComponent(vm, 1)">添加</el-button>
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
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column label="网点名称" prop="name" width="150" />
          <el-table-column label="所属区域" prop="region" width="200" />
          <el-table-column label="负责人" prop="author" />
          <el-table-column label="联系电话"  prop="phone" width="150" />
          <el-table-column label="网点地址" prop="address" width="200" />
          <el-table-column label="网点描述" prop="desc" width="200" />
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{ scope.row.is_show == 1 ? "启用" : "停用" }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="common.loadComponent(vm, 1, scope.row.id)">编辑</el-button>
              <el-button type="text" v-if="scope.row.is_show == 2" @click="updateRecord(scope.row.id, 1)">启用</el-button>
              <el-button type="text" v-if="scope.row.is_show == 1" @click="updateRecord(scope.row.id, 2)">停用</el-button>
              <el-button type="text" @click="updateRecord(scope.row.id, 3)">删除</el-button>
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
import { getNetworkList, updateRecord } from '@/api/network'
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

      total: 0,
      queryMes: {
        user: '',
        region: '',
        page: 1,
        limit: 10
      },

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
      getNetworkList(this.queryMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },

    updateRecord(id, type) {
      this.common.updateRecord(type, this, {
        model: 'savestatus',
        network_id: id,
        is_show: type
      }, updateRecord)
    }
  }
}
</script>
