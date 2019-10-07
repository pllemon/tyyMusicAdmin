<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">广告列表</p>
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
          <el-table-column label="展示图片" width="180">
            <template slot-scope="scope">
              <gd-image width="160" height="90" :src="scope.row.imgurl"/>
            </template>
          </el-table-column>
          <el-table-column label="类别">
            <template slot-scope="scope">
              {{ linkType[scope.row.type] }}
            </template>
          </el-table-column>
          <el-table-column label="链接" prop="url"/>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{ scope.row.is_show == 1 ? "启用" : "停用" }}
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="orders"/>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="common.loadComponent(vm, 0, scope.row.id)">详情</el-button> -->
              <el-button type="text" @click="common.loadComponent(vm, 1, scope.row.id)">编辑</el-button>
              <el-button type="text" v-if="scope.row.is_show == 2" @click="updateRecord(scope.row.id, 1)">启用</el-button>
              <el-button type="text" v-if="scope.row.is_show == 1" @click="updateRecord(scope.row.id, 2)">停用</el-button>
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
import { getList, updatebannerstatus } from '@/api/advert'
import Details from '@/views/system/advert/details'
import Update from '@/views/system/advert/update'

export default {
  components: {
    Details,
    Update
  },
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
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },

    selectionChange() {

    },

    updateRecord(id, type) {
      this.common.updateRecord(type, this, {
        banner_id: id,
        is_show: type
      }, updatebannerstatus)
    }
  }
}
</script>
