<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">商家列表</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round  @click="exportExcel()">批量导出</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="mini" class="search-form" ref="searchForm">
        <!-- <el-form-item label="申请时间">
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
        </el-form-item> -->
        <el-form-item label="店铺名" prop="name">
          <el-input v-model="queryMes.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="queryMes.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="店铺地址" prop="address">
          <el-input v-model="queryMes.address" placeholder="请输入" />
        </el-form-item>  
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryMes.status" placeholder="请选择">
            <el-option v-for="(item, index) in dict.recordStatus" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
          <el-button @click="timeRange=[];resetSearch()">重置</el-button>
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
          <el-table-column label="店铺门面" width="120">
            <template slot-scope="scope">
              <gd-image :src="scope.row.shopimg" small/>
            </template>
          </el-table-column>
          <el-table-column label="店铺名" prop="name" width="120" />
          <el-table-column label="联系方式" prop="phone" width="120" />
          <el-table-column label="店铺地址" prop="address" min-width="160" />
          <el-table-column label="加盟费用" prop="" min-width="100" />
          <el-table-column label="商品数量" prop="" min-width="100" />
          <el-table-column label="状态" min-width="120">
            <template slot-scope="scope">
              {{ dict.recordStatus[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column label="申请时间" min-width="160" prop="creattime" />
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="loadComponent('Details', scope.row.id)">详情</el-button>
              <el-button type="text" v-if="scope.row.status == 2" @click="loadComponent('Examine', scope.row.id)">审核</el-button>
              <el-button type="text" v-if="scope.row.status == 4" @click="updateStatus({busines_id:scope.row.id, status:1})">启用</el-button>
              <el-button type="text" v-if="scope.row.status == 1" @click="updateStatus({busines_id:scope.row.id, status:4})">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
    </div>

    <!-- 弹窗 -->
    <component :is="currentComponent" :dialogMes="dialogMes"/>

    <!-- 导出 -->
    <form ref="exportForm" action="/admin/businesslist" method="post" style="display:none">
      <input name="model" value="exportToExcel" />
      <input v-if="this.timeRange" name="starttime" :value="this.timeRange[0]" />
      <input v-if="this.timeRange" name="endtime" :value="this.timeRange[1]" />
      <div></div>
    </form>
  </div>
</template>

<script>
import ListMixin from '@/mixin/list'
import { getList, savebusinessstatus } from '@/api/businessman'
import Details from '@/views/businessman/details'
import Examine from '@/views/businessman/examine'

export default {
  mixins: [ListMixin],
  components: {
    Details,
    Examine
  },
  data() {
    return {
      queryMes: {
        page: 1,
        limit: 10,
        name: '',
        phone: '',
        address: '',
        status: '',
        starttime: '',
        endtime: '',
        district: '',
        city: '',
        province: '',
      },
      timeRange: [],

      api: {
        getList,
        enable: savebusinessstatus
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.againFetch()
    },
    globalSearch: {
      handler(val) {
        this.againFetch()
      },
      deep: true
    }
  },
  created() {
    this.againFetch()
  },
  methods: {
    againFetch() {
      const that = this
      that.timeRange = []
      that.queryMes= {
        page: 1,
        limit: 10,
        name: '',
        phone: '',
        address: '',
        status: '',
        starttime: '',
        endtime: '',
        district: '',
        city: '',
        province: '',
      }
      // let query = that.$route.query
      // for (let i in query) {
      //   if (i) {
      //     that.queryMes[i] = query[i]
      //   }
      // }
      this.queryMes.district = this.globalSearch.district
      this.queryMes.city = this.globalSearch.city
      this.queryMes.province = this.globalSearch.province
      that.fetchData()
    },
    beforeFetch() {
      if (this.timeRange.length) {
        this.queryMes.starttime = this.timeRange[0]
        this.queryMes.endtime = this.timeRange[1]
      } else {
        this.queryMes.starttime = ''
        this.queryMes.endtime = ''
      }
    }
  }
}
</script>
