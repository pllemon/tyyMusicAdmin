<template>
  <div>
    <div class="section">
      <p class="section-title">订单基本信息</p>
      <ul class="order-mes">
        <li>
          <label>订单ID：</label>
          <p>2465653432435</p>
        </li>
        <li>
          <label>下单用户：</label>
          <p>李小花 13640534320</p>
        </li>
        <li>
          <label>服务需求：</label>
          <p>装修工匠-安装空调</p>
        </li>
        <li>
          <label>服务地址：</label>
          <p>广东广州天河龙洞街迎龙路3巷11号</p>
        </li>
        <li>
          <label>预约时间：</label>
          <p>1971-12-24 22:51:34</p>
        </li>
        <li>
          <label>用户备注：</label>
          <p>1971-12-24 22:51:34</p>
        </li>
        <li>
          <label>订单状态：</label>
          <p>待用户支付定金</p>
        </li>
        <li class="w100">
          <label>相关图片：</label>
          <div class="img-list">
            <img src="">
            <img src="">
            <img src="">
          </div>
        </li>
      </ul>
    </div>

    <div class="section">
      <p class="section-title">审核资料上传</p>
      <div class="flex" style="padding: 20px 0;">
        <el-form ref="examineForm" :model="examineForm" label-width="120px" style="width: 600px;margin-right: 50px">
          <el-form-item label="订单总价格：">
            <el-input v-model="examineForm.name"></el-input>
          </el-form-item>
          <el-form-item label="定金金额：">
            <el-input v-model="examineForm.name"></el-input>
          </el-form-item>
          <el-form-item label="师傅工资：">
            <el-input v-model="examineForm.name"></el-input>
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
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="text-center m10 font-bold">请上传报价单</p>
        </div>
      </div>
    </div>

    <div class="section">
      <p class="section-title">师傅报名情况</p>
      <ul class="master-list">
        <li v-for="(item, index) in list" :key="index">
          <img src="">
          <div class="flex1">
            <p style="font-weight: bold">李师傅 NO3424</p>
            <p><i class="el-icon-phone-outline"></i> 1343445345</p>
          </div>
          <el-button type="primary" size="mini">选择</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: [1,2,3,4,5],
      listLoading: true,
      examineForm: {}
    }
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
    &.w100{
      width: 100%;
    }
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