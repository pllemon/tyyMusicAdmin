<template>
  <div class="app-container list-layout">
    <!-- 表头 -->
    <div class="table-header">
      <p class="section-title">平台通知</p>
      <div class="action">
         <el-button size="small" icon="el-icon-plus" round @click="update">添加</el-button>
      </div>
    </div>

    <div class="table-content">
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
          <el-table-column label="消息标题" prop="title" />
          <el-table-column label="创建时间" prop="time" />
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="update(scope.row.id)">编辑</el-button>
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
import { getList } from '@/api/notice'
import Update from '@/views/system/notice/update'
import ListMixin from '@/mixin/list'

export default {
  mixins: [ListMixin],
  components: {
    Update
  },
  data() {
    return {
      vm: this,

      queryMes: {
        type: 'xttz', 
        model: 'list'
      },
      api: {
        getList
      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    update(id) {
      this.$router.push('/system/notice/update?id=' + id)
    }
  }
}
</script>
