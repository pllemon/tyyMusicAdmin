<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">商家列表</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round  @click="common.exportExcel(vm)">批量导出</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
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
            <el-option v-for="(item, index) in recordStatus" :key="index" :label="item" :value="index" />
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
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column label="店铺名" prop="name" width="120"/>
          <el-table-column label="联系方式" prop="phone" width="120"/>
          <el-table-column label="店铺地址" prop="address" width="200"/>
          <el-table-column label="门面图片" width="120">
            <template slot-scope="scope">
              <gd-image :src="scope.row.shopimg" small/>
            </template>
          </el-table-column>
          <el-table-column label="产品图片" width="120">
            <template slot-scope="scope">
              <gd-image :src="scope.row.goodsimg" small/>
            </template>
          </el-table-column>
          <el-table-column label="营业执照" width="120">
            <template slot-scope="scope">
              <gd-image :src="scope.row.businessimg" small/>
            </template>
          </el-table-column>
          <el-table-column label="分享图片" width="120">
            <template slot-scope="scope">
              <gd-image :src="scope.row.sharewximg" small/>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              {{ recordStatus[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column label="申请时间" width="200" prop="creattime" />
          <el-table-column label="审核时间" width="200" prop="examine" />
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.id)">详情</el-button>
              <el-button type="text" v-if="scope.row.status == 2" @click="common.loadComponent(vm, 2, scope.row.id)">审核</el-button>
              <el-button type="text" v-if="scope.row.status == 4" @click="updateRecord(scope.row.id, 1)">启用</el-button>
              <el-button type="text" v-if="scope.row.status == 1" @click="updateRecord(scope.row.id, 4)">禁用</el-button></template>
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
      <div></div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getList, savebusinessstatus } from '@/api/businessman'
import Details from '@/views/businessman/details'
import Examine from '@/views/businessman/examine'

export default {
  components: {
    Details,
    Examine
  },
  data() {
    return {
      vm: this,

      list: null,
      listLoading: true,
      selectArr: [],

      total: 0,
      queryMes: {
        name: '',
        phone: '',
        address: '',
        status: '',
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
      let ctype = type == 4 ? 2 : 1;
      this.common.updateRecord(ctype, this, {
        busines_id: id,
        status: type
      }, savebusinessstatus)
    }
  },
  computed: {
    ...mapState({
      recordStatus: state => state.dict. recordStatus
    })
  }
}
</script>
