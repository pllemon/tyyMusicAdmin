<template>
  <div>
    <div class="table-section">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        height="360px"
      >
        <el-table-column label="序号" type="index" width="50" fixed/>
        <el-table-column label="商品图片" align="center" width="100">
          <template slot-scope="scope">
            <gd-image :src="scope.row.goods_image" width="50" height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goods_name"/>
        <el-table-column label="价格" prop="price"/>
        <el-table-column label="加入费用" prop=""/>
        <el-table-column label="状态" prop=""/>
      </el-table>
    </div>
    <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { businessgoodslist } from '@/api/businessman'

export default {
  props: {
    id: {
      type: Number,
      default: ''
    }
  },
  data() {
    return {
      vm: this,

      list: null,
      listLoading: true,
      selectArr: [],

      total: 0,
      queryMes: {
        business_id: '',
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.queryMes.business_id = this.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      businessgoodslist(this.queryMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
