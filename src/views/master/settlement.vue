<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">薪酬申请</p>
      <div class="action">
        <!-- <el-button size="small" icon="el-icon-upload2" round>批量导出</el-button> -->
      </div>
    </div>

    <div class="table-content">
      <!-- 搜索 -->
      <el-form :inline="true" :model="queryMes" size="mini" class="search-form" ref="searchForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="queryMes.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="工号" prop="sn">
          <el-input v-model="queryMes.sn" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="结算状态" prop="status">
          <el-select v-model="queryMes.status" placeholder="请选择">
            <el-option
              v-for="(item, index) in dict.settleStauts"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请份额" prop="number">
          <el-select v-model="queryMes.number" placeholder="请选择">
            <el-option
              v-for="(item, index) in dict.settlePercent"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
          <el-button @click="resetSearch()">重置</el-button>
        </el-form-item>
      </el-form>

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
          <el-table-column label="头像" align="center">
            <template slot-scope="scope">
              <gd-image :src="scope.row.headerurl" headUrl width="40" height="40"/>
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="sn" />
          <el-table-column label="姓名" prop="name" />
          <el-table-column label="手机号" prop="phone" min-width="120" />
          <el-table-column label="订单号" min-width="160">
            <template slot-scope="scope">
              <span class="link" @click="loadComponent('OrderDetails', scope.row.order_id)">{{scope.row.order_sn}}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单总额">
            
          </el-table-column>
          <el-table-column label="申请份额">
            <template slot-scope="scope">
              {{ dict.settlePercent[scope.row.number] }}
            </template>
          </el-table-column>
          <el-table-column label="申请金额" prop="money" />
          <el-table-column label="申请时间" min-width="200" prop="time" />
          <el-table-column label="申请状态">
            <template slot-scope="scope">
              {{ dict.settleStauts[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column label="结算时间" min-width="200" prop="pay_time" />
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.status == 2" @click="surePay(scope.row.id, 1)">发放</el-button>
              <el-button type="text" v-if="scope.row.status == 0" @click="loadComponent('SettlementExamine', scope.row)">审核</el-button>
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
import ListMixin from '@/mixin/list'
import { craftsmansettlementlist, craftsmansettlement } from '@/api/master'
import OrderDetails from '@/views/order/details'
import SettlementExamine from '@/views/master/settlementExamine'

export default {
  mixins: [ListMixin],
  components: {
    OrderDetails,
    SettlementExamine
  },
  data() {
    return {
      queryMes: {
        status: '',
        name: '',
        sn: '',
        number: ''
      },
      api: {
        getList: craftsmansettlementlist
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    surePay(id, status) {
      
    },

    examine() {
      craftsmansettlement({
        slid: '',
        craftsman_id: '',
        status: '',
        shremark: ''
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
