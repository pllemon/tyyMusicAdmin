<template>
  <el-dialog :title="title[dialogMes.type]" :visible="true" width="1000px" :before-close="handleClose">
    <div class="section">
      <p class="section-title">基本信息</p>
      <ul class="order-mes">
        <li>
          <label>工号：</label>
          <p></p>
        </li>
        <li>
          <label>姓名：</label>
          <p>{{masterInfo.name}}</p>
        </li>
        <li>
          <label>身份证：</label>
          <p>{{masterInfo.sfz}}</p>
        </li>
        <li>
          <label>联系手机：</label>
          <p>{{masterInfo.phone}}</p>
        </li>
        <li>
          <label>联系地址：</label>
          <p>{{masterInfo.address}}</p>
        </li>
        <li>
          <label>个人简介：</label>
          <p>{{masterInfo.desc}}</p>
        </li>
        <li>
          <label>申请时间：</label>
          <p>{{masterInfo.create_time}}</p>
        </li>
      </ul>
    </div>

    <div class="section" v-if="dialogMes.type == 2">
      <p class="section-title">审核资料上传</p>
      <div class="flex" style="padding: 20px 0;">
        <el-form ref="examineForm" :model="examineForm" label-width="120px" style="width: 600px;margin-right: 50px">
          <el-form-item label="师傅编号：">
            <el-input v-model="examineForm.name" />
          </el-form-item>
          <el-form-item label="师傅证件：">
            <gd-upload @success="uploadSuccess"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitExamine">提交</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getDetails, craftsmanexamine } from '@/api/master'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      title: ['师傅详情', '编辑师傅', '审核师傅'],
      examineForm: {},
      masterInfo: {}
    }
  },
  created() {
    let that = this
    getDetails({
      id: that.dialogMes.id
    }).then(response => {
      console.log(response)
      that.masterInfo = response.data
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
