<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">用户反馈</p>
      <div class="action">
         <el-button size="small" icon="el-icon-plus" round @click="common.loadComponent(vm, 1)">添加</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
        <el-form-item label="启用状态">
          <el-input v-model="queryMes.user" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData()">搜索</el-button>
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
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" width="50" />
          <el-table-column label="反馈用户" prop="url"/>
          <el-table-column label="反馈时间" prop="time"/>
          <el-table-column label="反馈标题" prop="title"/>
          <el-table-column label="反馈内容" prop="feedback"/>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{ scope.row.is_show == 1 ? "启用" : "停用" }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="updateRecord(scope.row.id, 3)">处理</el-button>
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
import { getList } from '@/api/feedback'
import Details from '@/views/order/details'

export default {
  components: {
    Details
  },
  data() {
    return {
      vm: null,

      list: null,
      listLoading: true,
      selectArr: [],

      total: 0,
      queryMes: {
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
  computed: {
    ...mapState({
      linkType: state => state.dict.linkType
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

    selectionChange() {

    }
  }
}
</script>
