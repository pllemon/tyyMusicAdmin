<template>
  <el-dialog :modal-append-to-body="false" title="工程秀详情" :visible="true" width="1000px" :before-close="handleClose" >
    <div class="section detail-form">
      <!-- <p class="section-title small">工程秀信息</p> -->
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题:">
              {{ masterInfo.sn }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="描述:">
              {{ masterInfo.name }}
            </el-form-item>
          </el-col> 
          <el-col :span="8">
            <el-form-item label="相关图片:">
              {{ masterInfo.sfz }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="记录来源:">
              {{ masterInfo.sfz }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人:">
              {{ masterInfo.phone }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间:">
              {{ masterInfo.enter_time }}
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
      message: {}
    }
  },
  created() {
    const that = this
    getDetails({
      id: that.dialogMes.id
    }).then(response => {
      that.message = response.data.info
    })
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    }
  },
  computed: {
    ...mapState({
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
