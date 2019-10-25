<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">工程秀列表</p>
      <div class="action">
        <el-button size="small" icon="el-icon-plus" round @click="common.loadComponent(vm, 1)">添加</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="queryMes.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="记录来源" prop="type">
          <el-select v-model="queryMes.type" placeholder="请选择">
              <el-option v-for="(item, index) in originType" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="相关师傅" prop="crafts_man_name">
          <el-input v-model="queryMes.crafts_man_name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="订单ID" prop="order_sn">
          <el-input v-model="queryMes.order_sn" placeholder="请输入" />
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
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column label="标题" prop="title" />
          <el-table-column label="描述" prop="dec" />
          <el-table-column label="记录来源">
            <template slot-scope="scope">
              {{ originType[scope.row.type ]}}
            </template>
          </el-table-column>
          <el-table-column label="相关师傅" prop="crafts_man_name"/>
          <el-table-column label="订单编号" prop="order_sn"/>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope" >
              <i class="el-icon-time" />
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.id)">详情</el-button>
              <el-button type="text" @click="common.loadComponent(vm, 1, scope.row.id)">编辑</el-button>
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
import { getList, updateRecordStatus } from '@/api/show'
import Details from '@/views/show/details'
import Update from '@/views/show/update'

export default {
  components: {
    Details,
    Update
  },
  data() {
    return {
      vm: this,

      list: [],
      listLoading: true,
      selectArr: [],

      total: 0,
      queryMes: {
        title: '',
        type: '',
        order_sn: '',
        crafts_man_name: '',
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
      getList(this.queryMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },

    updateRecord(id, type) {
      this.common.updateRecord(type, this, {
        show_id: id,
        savestatus: 1,
        is_show: type
      }, updateRecordStatus)
    }
  },
  computed: {
    ...mapState({
      originType: state => state.dict.originType
    })
  }
}
</script>
