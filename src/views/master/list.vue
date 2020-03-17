<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">师傅列表</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round  @click="common.exportExcel(vm)">批量导出</el-button>
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
            :picker-options="common.timePickerOptions()">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="师傅名" prop="name">
          <el-input v-model="queryMes.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="师傅编号"  prop="sn">
          <el-input v-model="queryMes.sn" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryMes.status" placeholder="请选择">
            <el-option v-for="(item, index) in recordStatus" :key="index" :label="item" :value="index" />
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
          <!-- <el-table-column type="selection" width="55" fixed /> -->
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column label="师傅头像" align="center">
            <template slot-scope="scope">
              <gd-image :src="scope.row.headerurl" headUrl width="40" height="40"/>
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="sn" min-width="150"/>
          <el-table-column label="姓名" prop="name"/>
          <el-table-column label="身份证" prop="sfz" width="180"/>
          <el-table-column label="手机号" prop="phone" width="120"/>
          <el-table-column label="入行年份" prop="enter_time" width="100"/>
          <el-table-column label="联系地址" prop="address" width="200"/>
          <el-table-column label="个人简介" prop="desc" min-width="150"/>
          <el-table-column label="申请时间" width="200" prop="create_time" />
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              {{ recordStatus[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column label="审核时间" width="200" prop="examine_time" />
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.id)">详情</el-button>
              <el-button type="text" v-if="scope.row.status == 1" @click="common.loadComponent(vm, 1, scope.row.id)">编辑</el-button>
              <el-button type="text" v-if="scope.row.status == 2" @click="common.loadComponent(vm, 2, scope.row.id)">审核</el-button>
              <el-button type="text" v-if="scope.row.status == 4" @click="updateRecord(scope.row.id, 1)">启用</el-button>
              <el-button type="text" v-if="scope.row.status == 1" @click="updateRecord(scope.row.id, 4)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
    </div>

    <!-- 弹窗 -->
    <component :is="currentComponent" :dialogMes="dialogMes"/>

    <!-- 导出 -->
    <form ref="exportForm" action="/admin/craftsmanlist" method="post" style="display:none">
      <input name="model" value="exportToExcel" />
      <input v-if="this.timeRange" name="start_time" :value="this.timeRange[0]" />
      <input v-if="this.timeRange" name="end_time" :value="this.timeRange[1]" />
      <div></div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getList, savecraftsmanstatus } from '@/api/master'
import Details from '@/views/master/details'
import Examine from '@/views/master/examine'
import Update from '@/views/master/update'

export default {
  components: {
    Details,
    Examine,
    Update
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
        sn: '',
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
      if (this.timeRange.length) {
        this.queryMes.start_time = this.timeRange[0]
        this.queryMes.end_time = this.timeRange[1]
      } else {
        this.queryMes.start_time = ''
        this.queryMes.end_time = ''
      }
      getList(this.queryMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },

    selectionChange(val) {
      this.selectArr = val
    },

    updateRecord(id, type) {
      let ctype = type == 4 ? 2 : 1;
      this.common.updateRecord(ctype, this, {
        craftsman_id: id,
        status: type
      }, savecraftsmanstatus)
    }
  },
  computed: {
    ...mapState({
      recordStatus: state => state.dict.recordStatus
    })
  }
}
</script>
