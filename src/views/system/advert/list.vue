<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">广告列表</p>
      <div class="action">
        <el-button size="small" icon="el-icon-plus" round @click="details(-1, 1)">添加广告</el-button>
        <el-button size="small" icon="el-icon-upload2" round>批量导出</el-button>
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
          <el-table-column align="center" label="展示图片" />
          <el-table-column align="center" label="类别" />
          <el-table-column align="center" label="排序" />
          <el-table-column align="center" label="链接" />
          <el-table-column align="center" label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="pass(scope.$index)">启用</el-button>
              <el-button type="text" @click="nopass(scope.$index)">禁用</el-button>
              <el-button type="text" @click="details(scope.row.id, 2)">编辑</el-button>
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
import { bannerlist } from '@/api/advert'
import Details from '@/views/system/advert/details'

export default {
  data() {
    return {
      vm: null,

      list: null,
      listLoading: true,
      selectArr: [],

      total: 100,
      queryMes: {
        page: 1,
        limit: 10
      },

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
      bannerlist().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },

    selectionChange() {

    },

    handleClose() {
      this.showDialog = false
      this.currentComponent = ''
    },

    details(id, type) {
      this.dialogMes = {
        id: id,
        type: type
      }
      this.currentComponent = 'Details'
    },
    
    examine(id) {

    },

    pass(id) {
      
    },
  },
  components: {
    Details
  }
}
</script>
