<template>
  <div class="app-container list-layout">
    <div class="table-content">
      <!-- 搜索 -->
      <div class="search-form">
        <el-form :inline="true" :model="queryMes" size="mini" class="search-form" ref="searchForm">
          <el-form-item label="店铺名" prop="businessname">
            <el-input v-model="queryMes.businessname" placeholder="请输入" />
          </el-form-item>
          <!-- <el-form-item label="状态" prop="status">
            <el-select v-model="queryMes.status" placeholder="请选择">
              <el-option v-for="(item, index) in goodsStatus" :key="index" :label="item" :value="index" />
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="search()">搜索</el-button>
            <el-button @click="timeRange=[];resetSearch()">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="other-action">
          <!-- <el-button size="mini" type="primary" plain icon="el-icon-upload2" round  @click="exportExcel()">批量导出</el-button> -->
          <el-button size="mini" type="primary" plain icon="el-icon-money" round  @click="loadComponent('GoodPrice')">设置商品价格</el-button>
        </div>
      </div>
      
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
          <el-table-column label="商品图片" align="center" width="100">
            <template slot-scope="scope">
              <gd-image :src="scope.row.goods_image" width="50" height="50"/>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="goods_name"/>
          <el-table-column label="价格" prop="price"/>
          <el-table-column label="加入费用" prop="uploadprice"/>
          <el-table-column label="店铺名" prop="businessname"/>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{ goodsStatus[scope.row.status] }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="商品描述" prop="desc"/> -->
          <el-table-column label="创建时间" prop="time" min-width="120"/>
        </el-table>
      </div>
      <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />

      <!-- 弹窗 -->
      <component :is="currentComponent" :dialogMes="dialogMes"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListMixin from '@/mixin/list'
import { businessgoodslist } from '@/api/businessman'
import GoodPrice from '@/views/businessman/goodPrice'

export default {
  mixins: [ListMixin],
  components: {
    GoodPrice
  },
  data() {
    return {
      queryMes: {
        page: 1,
        limit: 20,
        status: '',
        businessname:''
      },

      api: {
        getList: businessgoodslist
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
  },
  computed: {
    ...mapState({
      goodsStatus: state => state.dict.goodsStatus
    })
  },
}
</script>
