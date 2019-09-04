<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :inline="true" :model="queryMes">
      <el-form-item label="下单时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="queryMes.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="queryMes.date2" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-input v-model="queryMes.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="queryMes.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
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
      <el-table-column align="center" label="订单ID" width="100"></el-table-column>
      <el-table-column align="center" label="下单用户"></el-table-column>
      <el-table-column align="center" label="服务需求"></el-table-column>
      <el-table-column align="center" label="服务地址"></el-table-column>
      <el-table-column align="center" label="预约时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="相关图片"></el-table-column>
      <el-table-column align="center" label="用户备注"></el-table-column>
      <el-table-column align="center" label="订单状态"></el-table-column>
      <el-table-column align="center" label="承接师傅"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="details(scope.$index)">详情</el-button>
          <el-button type="text" @click="examine(scope.$index)">审核</el-button>
          <el-button type="text" @click="release(scope.$index)">发布</el-button>
          <el-button type="text">指派</el-button>
          <el-button type="text">取消</el-button>
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

    // 发布订单
    release() {
      this.$confirm('确定发布该订单？发布后该订单将显示在抢单中心，师傅可以进行报名。', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发布成功!'
        });
      })
    }
  },
  components: {
    Details
  }
}
</script>
