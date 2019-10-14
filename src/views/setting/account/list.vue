<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">账号管理</p>
      <div class="action">
        <el-button size="small" icon="el-icon-plus" round @click="common.loadComponent(vm, 1)">添加</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
        <el-form-item label="账号名">
          <el-input v-model="queryMes.username" />
        </el-form-item>
        <el-form-item label="所属网点">
          <el-select v-model="queryMes.network_id">
            <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号角色">
          <el-select v-model="queryMes.role">
            <el-option v-for="(item, index) in roleType" :key="index" :label="item" :value="index" />
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
          <el-table-column label="账号名" width="100" prop="username" />
          <el-table-column label="联系电话" width="150" prop="phone" />
          <el-table-column label="所属网点" width="150">
            <template slot-scope="scope">
              {{networkArr[scope.row.network_id]}}
            </template>
          </el-table-column>
          <el-table-column label="账号角色" width="150">
            <template slot-scope="scope">
              {{roleType[scope.row.role]}}
            </template>
          </el-table-column>
          <el-table-column label="账号备注" prop="remark" width="150"/>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{ scope.row.status == 1 ? "启用" : "停用" }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="common.loadComponent(vm, 1, scope.row.id)">编辑</el-button>
              <el-button type="text" v-if="scope.row.status == 2" @click="updateRecord(scope.row.id, 1)">启用</el-button>
              <el-button type="text" v-if="scope.row.status == 1" @click="updateRecord(scope.row.id, 2)">停用</el-button>
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
import { mapState } from 'vuex'
import { getAccountList, updateStatus } from '@/api/account'
import { getNetworkList } from '@/api/network'
import Details from '@/views/setting/account/details'
import Update from '@/views/setting/account/update'

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
        page: 1,
        limit: 10
      },

      currentComponent: '',
      dialogMes: {},

      networkList: []
    }
  },
  created() {
    this.vm = this
    this.getNetwork()
  },
  methods: {
    getNetwork() {
      getNetworkList({
        page: 1,
        limit: 1000
      }).then(response => {
        this.networkList = response.data.data
        this.fetchData()
      })
    },

    fetchData() {
      this.listLoading = true
      getAccountList(this.queryMes).then(response => {
        this.list = response.data.data
      }).finally(() => {
        this.listLoading = false
      })
    },

    selectionChange(val) {
      this.selectArr = val
    },

    updateRecord(id, type) {
      this.common.updateRecord(type, this, {
        admin_id: id,
        status: type
      }, updateStatus)
    }
  },
  components: {
    Details,
    Update
  },
  computed: {
    ...mapState({
      roleType: state => state.dict.roleType
    }),
    networkArr() {
      let networkObj = {}
      this.networkList.forEach(item => {
        networkObj[item.id] = item.name
      })
      return networkObj
    }
  }
}
</script>
