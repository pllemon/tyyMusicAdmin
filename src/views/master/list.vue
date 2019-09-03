<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :inline="true" :model="queryMes">
      <el-form-item label="申请时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="queryMes.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="queryMes.date2" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="师傅名">
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
      <el-table-column align="center" label="姓名"></el-table-column>
      <el-table-column align="center" label="身份证"></el-table-column>
      <el-table-column align="center" label="手机号"></el-table-column>
      <el-table-column align="center" label="入行年份"></el-table-column>
      <el-table-column align="center" label="服务项目"></el-table-column>
      <el-table-column align="center" label="联系地址"></el-table-column>
      <el-table-column align="center" label="个人简介"></el-table-column>
      <el-table-column align="center" label="申请时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="pass(scope.$index)">通过</el-button>
          <el-button type="text" @click="nopass(scope.$index)">不通过</el-button>
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
