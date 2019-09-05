<template>
  <div>
    <div class="section">
      <p class="section-title">师傅基本信息</p>
      <ul class="order-mes">
        <li>
          <label>工号：</label>
          <p>2465653432435</p>
        </li>
        <li>
          <label>姓名：</label>
          <p>李小花 13640534320</p>
        </li>
        <li>
          <label>身份证：</label>
          <p>装修工匠-安装空调</p>
        </li>
        <li>
          <label>联系方式：</label>
          <p>广东广州天河龙洞街迎龙路3巷11号</p>
        </li>
        <li>
          <label>个人简介：</label>
          <p>1971-12-24 22:51:34</p>
        </li>
        <li>
          <label>申请时间：</label>
          <p>1971-12-24 22:51:34</p>
        </li>
        <li class="w100">
          <label>工作证：</label>
          <div class="img-list">
            <img src="">
            <img src="">
            <img src="">
          </div>
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
          <el-form-item label="定金金额：">
            <el-input v-model="examineForm.name" />
          </el-form-item>
          <el-form-item label="师傅工资：">
            <el-input v-model="examineForm.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <p class="text-center m10 font-bold">请上传师傅证件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      examineForm: {}
    }
  },
  methods() {
    
  }
}
</script>

<style scoped lang="scss">
.img-list img{
  width: 300px;
  height: 200px;
  border: 1px solid #f2f2f2;
  margin-right: 20px;
}

.section{
  margin-bottom: 40px;
  .section-title{
    font-size: 18px;
    margin-bottom: 10px;
    color: #409EFF;
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
