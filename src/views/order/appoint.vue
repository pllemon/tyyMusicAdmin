<template>
  <el-dialog :modal-append-to-body="false" title="指派师傅" :visible="true" width="1000px" :before-close="handleClose">
    <div v-loading="loading">
      <div class="flex-center" style="height: 200px;" v-if="craftsmanlist.length == 0">
        还没有师傅进行报名哦～
      </div>
      <div v-else>
        <p style="margin-bottom: 10px">请选择一个师傅，该订单将派发给该师傅负责</p>
        <ul class="master-list">
          <li v-for="(item, index) in craftsmanlist" :key="index">
            <img src="">
            <div class="flex1">
              <p style="font-weight: bold">{{item.name}} {{item.sn}}</p>
              <p><i class="el-icon-phone-outline" /> {{item.phone}}</p>
            </div>
            <el-button type="primary" size="mini" @click="choose(item.id)">选择</el-button>
          </li>
        </ul>
      </div>
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
        choosecraftsman({
          order_id: this.dialogMes.id,
          craftsman_id: id
        }).then(response => {
          this.common.closeComponent(this)
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
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      background: #f2f2f2;
    }
  }
}
</style>
