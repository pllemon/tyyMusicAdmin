<template>
  <div class="app-container list-layout">
    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="mini" class="search-form" ref="searchForm">
        <!-- <el-form-item label="统计方式" prop="type">
          <el-select v-model="queryMes.type" placeholder="请选择" @change="changeType">
            <el-option label="单个网点" value="0" />
            <el-option label="单个月份" value="1" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="月份" prop="time" v-if="queryMes.type == 1">
          <el-date-picker 
            v-model="queryMes.time" 
            type="month" 
            :clearable="false" 
            value-format="yyyy-MM-01" 
            @change="search()"
          />
        </el-form-item> -->
        <el-form-item label="网点" prop="network_id" v-if="!userInfo.network_id && queryMes.type == 0">
          <el-select v-model="queryMes.network_id"  @change="search()">
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
          <el-table-column label="月份" prop="time" min-width="200"/> 
          <el-table-column label="不成交单" min-width="180" prop="bcdnum" />
          <el-table-column label="已成交单" min-width="180" prop="cdnum" />
          <el-table-column label="一期完成单" min-width="180" prop="yqnum" />
          <el-table-column label="二期完成单" min-width="180" prop="eqnum" />
        </el-table>
      </div>
      <!-- <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" /> -->
    </div>

    <!-- 弹窗 -->
    <component :is="currentComponent" :dialogMes="dialogMes"/>
  </div>
</template>

<script>
import ListMixin from '@/mixin/list'
import { craftsmantj } from '@/api/finance'

export default {
  mixins: [ListMixin],
  data() {
    return {
      queryMes: {
        page: 1,
        limit: 20,
        craftsman_id: '1',
      },
      networkList: [],
      listLoading: false,
      api: {
        getList: craftsmantj
      },
    }
  },
  created() {
    let that = this
    this.common.getAllNetwork(this, function() {
      // that.queryMes.network_id = that.networkList[0].id
      that.fetchData()
    })
  },
  methods: {
    changeType(e) {
      if (e == 1) {
        this.queryMes.network_id = ''
        this.queryMes.time = '2020-08-01'
        this.fetchData()
      } else {
        this.queryMes.time = ''
        this.queryMes.network_id = this.networkList[0].id
        this.fetchData()
      }
    },

    fetchCallback(data) {
      let list = []
      for (let i in data) {
        data[i].time = i
        list.push(data[i])
      }
      this.list = list
    }
  },
}
</script>
