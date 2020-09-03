<template>
  <div class="app-container list-layout">
    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="mini" class="search-form" ref="searchForm">
        <el-form-item label="统计方式" prop="type">
          <el-select v-model="queryMes.type" placeholder="请选择">
            <el-option label="某个网点" value="0" />
            <el-option label="某个月份" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="月份" prop="month" v-if="queryMes.type == 1">
          <el-date-picker v-model="queryMes.month" type="month" />
        </el-form-item>
        <el-form-item label="网点" prop="network_id" v-if="!userInfo.network_id && queryMes.type == 0">
          <el-select v-model="queryMes.network_id">
            <el-option v-for="(item, index) in networkList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
          <!-- <el-button @click="resetSearch()">重置</el-button> -->
        </el-form-item>
      </el-form>

      <!-- 表格&分页 -->
      <div class="table-section">
        <el-table
          ref="table"
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          height="100%"
        >
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column label="网点名称" prop="service_demand" min-width="200"/> 
          <el-table-column label="月份" prop="service_demand" min-width="200"/> 
          <el-table-column label="不成交单" min-width="180" prop=" " />
          <el-table-column label="已成交单" min-width="180" prop=" " />
          <el-table-column label="一期完成单" min-width="180" prop=" " />
          <el-table-column label="二期完成单" min-width="180" prop=" " />
        </el-table>
      </div>
      <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
    </div>

    <!-- 弹窗 -->
    <component :is="currentComponent" :dialogMes="dialogMes"/>
  </div>
</template>

<script>
import ListMixin from '@/mixin/list'
import { getList } from '@/api/order'

export default {
  mixins: [ListMixin],
  data() {
    return {
      queryMes: {
        page: 1,
        limit: 20,
        type: '0',
        month: '',
        network_id: ''
      },
      networkList: [],
      api: {
        getList
      },
    }
  },
  created() {
    this.common.getAllNetwork(this)
    this.fetchData()
  }
}
</script>
