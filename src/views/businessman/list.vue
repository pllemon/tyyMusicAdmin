<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">商家列表</p>
      <div class="action">
        <el-button size="small" icon="el-icon-upload2" round>批量导出</el-button>
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="small" class="search-form" ref="searchForm">
        <el-form-item label="申请时间">
          <el-col :span="11">
            <el-date-picker v-model="queryMes.date1" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-col>
          <el-col class="line text-center" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="queryMes.date2" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="师傅名">
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
          <el-table-column align="center" label="店铺名" prop="name" width="120"/>
          <el-table-column align="center" label="联系方式" prop="phone" width="120"/>
          <el-table-column align="center" label="店铺地址" prop="address" width="200"/>
          <el-table-column align="center" label="门面图片" width="120">
            <template slot-scope="scope">
              <img :src="config.ip + scope.row.shopimg" style="width:100px"/>
            </template>
          </el-table-column>
          <el-table-column align="center" label="产品图片" width="120">
            <template slot-scope="scope">
              <img :src="config.ip + scope.row.goodsimg" style="width:100px"/>
            </template>
          </el-table-column>
          <el-table-column align="center" label="营业执照" width="120">
            <template slot-scope="scope">
              <img :src="config.ip + scope.row.businessimg" style="width:100px"/>
            </template>
          </el-table-column>
          <el-table-column align="center" label="分享图片" width="120">
            <template slot-scope="scope">
              <img :src="config.ip + scope.row.sharewximg" style="width:100px"/>
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.display_time }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="pass(scope.row.id)">通过</el-button>
              <el-button type="text" @click="nopass(scope.row.id)">不通过</el-button>
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
import { getList } from '@/api/businessman'
import Details from '@/views/businessman/details'
import Reject from '@/views/businessman/reject'

export default {
  components: {
    Details,
    Reject
  },
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
        page: 2,
        limit: 10
      },
      statusOptions: ['未审核', '审核通过', '已驳回'],

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
      getList().then(response => {
        this.list = response.data
      }).finally(() => {
        this.listLoading = false
      })
    },

    selectionChange(val) {
      this.selectArr = val
    },

    details(id, type) {
      this.dialogMes = {
        id: id,
        type: type
      }
      this.currentComponent = 'Details'
    },

    reject(id) {
      this.dialogMes = {
        id: id
      }
      this.currentComponent = 'Reject'
    },
  },
  computed: {
    ...mapState({
      config: state => state.dict.config
    })
  }
}
</script>
