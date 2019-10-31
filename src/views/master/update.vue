<template>
  <el-dialog :modal-append-to-body="false" title="编辑" :visible="true" width="800px" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" style="margin-right: 50px" v-loading="loading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="师傅头像:">
            <gd-image :src="form.headerurl" headUrl width="100" height="100"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="师傅工号:">
            <el-input type="text" v-model="form.sn" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="师傅姓名:">
            <el-input type="text" v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="身份证:">
            <el-input type="text" v-model="form.sfz" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系手机:">
            <el-input type="text" v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="入行年份:">
            <el-input type="text" v-model="form.enter_time" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系地址:">
            <el-input type="text" v-model="form.address" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="个人简介:">
            <el-input type="textarea" :rows="4" v-model="form.desc" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { getDetails } from '@/api/master'

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
      form: {}
    }
  },
  computed: {
    ...mapState({
      changeType: state => state.dict.changeType,
      recordStatus: state => state.dict.recordStatus
    })
  },
  created() {
    const that = this
    getDetails({
      id: that.dialogMes.id
    }).then(response => {
      that.form = response.data.info
    }).finally(() => {
      that.loading = false
    })
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    }
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
.order-mes{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 33.33%;
    margin-bottom: 15px;
    box-sizing: border-box;
    font-weight: bold;
    label{
      margin-bottom: 5px;
      display: block;
      font-weight: normal;
    }
  }
}

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
