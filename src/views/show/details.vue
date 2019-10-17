<template>
  <el-dialog :modal-append-to-body="false" title="详情" :visible="true" width="800px" :before-close="handleClose" >
    <div class="section detail-form" v-loading="loading">
      <p class="section-title small">工程秀信息</p>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题:">
              {{ message.title }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述:">
              {{ message.dec }}
            </el-form-item>
          </el-col> 
          <el-col :span="24">
            <el-form-item label="相关图片:">
              <gd-image v-if="message.imgurl1" :src="message.imgurl1"/>
              <gd-image v-if="message.imgurl2" :src="message.imgurl2"/>
              <gd-image v-if="message.imgurl3" :src="message.imgurl3"/>
              <gd-image v-if="message.imgurl4" :src="message.imgurl4"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="记录来源:">
              {{ originType[message.type ]}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间:">
              {{ message.time }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单编号:">
              {{ message.order_sn }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="相关师傅:">
              {{ message.crafts_man_name }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails } from '@/api/show'

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
      message: {}
    }
  },
  created() {
    const that = this
    getDetails({
      show_id: that.dialogMes.id
    }).then(response => {
      that.message = response.data
    }).finally(() => {
      that.loading = false
    })
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    }
  },
  computed: {
    ...mapState({
      originType: state => state.dict.originType
    })
  }
}
</script>

<style scoped lang="scss">
.section{
  margin-bottom: 40px;
  .section-title{
    margin-bottom: 15px;
  }
}
</style>
