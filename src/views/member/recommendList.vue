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
        <el-table-column label="用户头像" align="center">
          <template slot-scope="scope">
            <gd-image :src="scope.row.headerurl" headUrl width="40" height="40"/>
          </template>
        </el-table-column>
        <el-table-column label="用户账号" prop="phone"/>
        <el-table-column label="用户名" prop="username"/>
        <el-table-column label="上级推荐人" prop="friend_name"/>
        <el-table-column label="注册时间" prop="creattime" />
      </el-table>
    </div>                            
    <gd-pagination :total="total" :current-page="queryMes.page" :page-size="queryMes.limit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getList } from '@/api/member'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
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
        invitation_code: '',
        page: 1,
        limit: 10
      }
    }
  },
  computed: {
    ...mapState({
      identityType: state => state.dict.identityType
    })
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.queryMes).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
