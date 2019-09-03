<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :inline="true" :model="queryMes">
      <el-form-item label="启用状态">
        <el-input v-model="queryMes.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData()">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格&分页 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column align="center" label="展示图片"></el-table-column>
      <el-table-column align="center" label="状态"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="pass(scope.$index)">启用</el-button>
          <el-button type="text" @click="nopass(scope.$index)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible="showDialog" width="1100px" :before-close="handleClose">
      <component v-bind:is="currentComponent"></component>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Details from '@/views/order/details'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      queryMes: {
        user: '',
        region: ''
      },
      currentComponent: '',
      showDialog: false,
      dialogTitle: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },

    handleClose() {
      this.showDialog = false
      this.currentComponent = ''
    },

    // 订单详情
    details(id) {
      this.showDialog = true
      this.dialogTitle = '订单详情'
      this.currentComponent = 'Details'
    },

    // 审核订单
    examine(id) {

    },

    pass(id) {
      
    }
  },
  components: {
    Details
  }
}
</script>
