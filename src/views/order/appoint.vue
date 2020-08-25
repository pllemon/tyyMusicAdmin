<template>
  <el-dialog :modal-append-to-body="false" title="指派师傅" :visible="true" width="1000px" :before-close="handleClose" :close-on-click-modal="false">
    <div>
      
        <p style="margin-bottom: 10px">请选择一个师傅，该订单将派发给该师傅负责</p>
        <el-table
          ref="table"
          v-loading="loading"
          :data="craftsmanlist"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          height="400px"
        >
          <el-table-column label="序号" type="index" width="50" fixed/>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <p class="flex-center-start">
                <gd-image :src="scope.row.headerurl" headUrl width="40" height="40" style="margin-right:10px"/>
                <span>{{scope.row.name}}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="sn" />
          <el-table-column label="手机号" prop="phone" />
          <el-table-column label="报名时间" prop="time" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="choose(scope.row.id)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { ordercraftsmanlist, choosecraftsman } from '@/api/order'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: true,
      craftsmanlist: []
    }
  },
  computed: {
    ...mapState({
      orderStatus: state => state.dict.orderStatus
    })
  },

  created() {
    const that = this
    ordercraftsmanlist({
      order_id: that.dialogMes.id
    }).then(response => {
      this.loading = false
      that.craftsmanlist = response.data
    })
  },

  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    choose(id) {
      this.$confirm('确定选择该师傅?', '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true
        choosecraftsman({
          order_id: this.dialogMes.id,
          craftsman_id: id
        }).then(response => {
          this.common.closeComponent(this)
        }).finally(() => {
          this.loading = false
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.master-list{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 32%;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    line-height: 1.5;
    margin-right: 2%;
    padding: 10px;
    box-sizing: border-box;
    &:nth-of-type(3n){
      margin-right: 0;
    }
  }
}
</style>
