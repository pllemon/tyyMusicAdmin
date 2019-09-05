<template>
  <div class="app-container list-layout">
    <!-- 搜索 -->
    <el-form :inline="true" :model="queryMes" size="small">
      <el-form-item label="申请月份">
        <el-date-picker
          v-model="queryMes.month"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="queryMes.status" placeholder="请选择">
          <el-option
            v-for="(item, index) in statusOptions"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="师傅名">
        <el-input v-model="queryMes.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="师傅编号">
        <el-input v-model="queryMes.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData()">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格&分页 -->
    <div class="table-header">
      <p class="title">师傅列表</p>
      <div class="action">
        <el-button>批量导出</el-button>
      </div>
    </div>
    <div class="table-content">
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
        <el-table-column type="selection" width="55" fixed />
        <el-table-column type="index" width="50" />
        <el-table-column align="center" label="姓名" />
        <el-table-column align="center" label="身份证" />
        <el-table-column align="center" label="手机号" />
        <el-table-column align="center" label="入行年份" />
        <el-table-column align="center" label="服务项目" />
        <el-table-column align="center" label="联系地址" />
        <el-table-column align="center" label="个人简介" />
        <el-table-column align="center" label="申请时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="details(scope.$index, 1)">详情</el-button>
            <el-button type="text" @click="details(scope.$index, 3)">编辑资料</el-button>
            <el-button type="text" @click="details(scope.$index, 2)">通过</el-button>
            <el-button type="text" @click="reject(scope.$index)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />

    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible="showDialog" width="1100px" :before-close="handleClose">
      <component :is="currentComponent" :dialogMes="dialogMes"/>
    </el-dialog>

    <!-- 驳回弹窗 -->
    <el-dialog title="驳回申请" :visible="true" v-if="showReject" width="500px">
      <p>确定驳回该申请？可填写驳回原因：</p>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2}"
        placeholder="请输入"
        v-model="rejectReason"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReject = false">取 消</el-button>
        <el-button type="primary" @click="submitReject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Details from '@/views/master/details'

export default {
  components: {
    Details
  },
  data() {
    return {
      list: null,
      listLoading: true,
      selectArr: [],
      activeId: '',

      total: 100,
      queryMes: {
        user: '',
        region: '',
        page: 2,
        limit: 10
      },
      statusOptions: ['未审核', '审核通过', '已驳回'],

      currentComponent: '',
      showDialog: false,
      dialogTitle: '',
      dialogMes: {},

      showReject: false,
      rejectReason: ''
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

    selectionChange(val) {
      console.log(val)
      this.selectArr = val
    },

    handleClose() {
      this.showDialog = false
      this.currentComponent = ''
    },

    details(id, type) {
      if (type == 1) {
        this.dialogTitle = '详情'
      } else if (type == 2) {
        this.dialogTitle = '审核'
      } else if (type == 3) {
        this.dialogTitle = '编辑资料'
      }
      this.dialogMes = {
        id: id,
        type: type
      }
      this.showDialog = true
      this.currentComponent = 'Details'
    },

    reject(id) {
      this.activeId = id
      this.showReject = true
    },
    submitReject() {
      console.log(this.activeId)
      console.log(this.rejectReason)
      this.rejectReason = ''
      this.fetchData()
    }
  }
}
</script>
