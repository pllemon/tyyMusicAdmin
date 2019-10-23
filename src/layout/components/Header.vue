<template>
  <div class="header flex-center-between">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <!-- <div class="flex-center-start">
      <p class="title">多师傅后台管理系统</p>
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          水口分网点1 <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>水口分网点1</el-dropdown-item>
          <el-dropdown-item>水口分网点2</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
    <div class="flex-center">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-user-solid"></i>
          {{ name }} 
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">账号信息</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <p @click="showNews()" style="padding: 0 20px;cursor:pointer" v-show="newsLength">
        <el-badge :value="newsLength" class="item">
          <i class="el-icon-bell animated swing infinite" style="font-size:18px;display:block;position:relative;top:-1px" />
        </el-badge>
      <p>
      <p @click="sendNews()">发送</p>
    </div>

     <!-- 全局消息弹窗 -->
    <el-dialog
      title="消息中心"
      :modal-append-to-body="false"
      :visible.sync="showNewsDialog"
      width="700px"
      :before-close="closeNews">
      <ul class="news-list">
        <li @click="goOrder(1)" class="flex">
          <el-badge :value="1" class="item">
            <svg-icon icon-class="affiliations_li" />
          </el-badge>
          <div class="news-mes">
            <p class="news-title">叮叮叮~来新订单啦~</p>
            <p class="news-dec">用户 里昂米尼（13650965856）下了个新订单，赶紧接单吧！</p>
            <p class="news-dec">用户 西西米（13695896542）下了个新订单，赶紧接单吧！</p>
          </div>
        </li>
        <li @click="goOrder(3)" class="flex">
          <el-badge :value="1" class="item">
            <svg-icon icon-class="coinpurse_line" />
          </el-badge>
          <div class="news-mes">
            <p class="news-title">用户已支付定金~</p>
            <p class="news-dec">订单编号 24354523 ，用户已支付定金，赶紧为TA发布订单吧！</p>
          </div>
        </li>
        <li @click="goOrder(8)" class="flex">
          <el-badge :value="1" class="item">
            <svg-icon icon-class="attestation" />
          </el-badge>
          <div class="news-mes">
            <p class="news-title">用户已支付尾款~</p>
            <p class="news-dec">订单编号 24354523 ，用户已支付尾款，订单已完成！</p>
          </div>
        </li>
        <li @click="goMaster()" class="flex">
          <el-badge :value="1" class="item">
            <svg-icon icon-class="namecard" />
          </el-badge>
          <div class="news-mes">
            <p class="news-title">有新师傅申请加入啦~</p>
            <p class="news-dec">用户 里昂米尼（13650965856）申请成为师傅，赶紧处理吧！</p>
            <p class="news-dec">用户 西西米（13695896542）申请成为师傅，赶紧处理吧！</p>
          </div>
        </li>
        <li @click="goBusinessman()" class="flex">
          <el-badge :value="1" class="item">
            <svg-icon icon-class="boss" />
          </el-badge>
          <div class="news-mes">
            <p class="news-title">有新商家申请入驻啦~</p>
            <p class="news-dec">用户 里昂米尼（13650965856）申请成为商家，赶紧处理吧！</p>
            <p class="news-dec">用户 西西米（13695896542）申请成为商家，赶紧处理吧！</p>
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { worksend } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      showNewsDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'newList'
    ]),
    newsLength() {
      let newsSum = 0
      for (let i in this.newList) {
        newsSum += this.newList[i].length
      }
      return newsSum
    }
  },
  methods: {
    goOrder(type, status) {
      this.$store.commit('news/REMOVE_NEWS', type)
      this.showNewsDialog = false
      this.$router.push('/order/list?status=' + status)
    },
    goMaster() {
      this.$store.commit('news/REMOVE_NEWS', 'newMaster')
      this.showNewsDialog = false
      this.$router.push('/master/list?status=1')
    },
    goBusinessman(type) {
      this.$store.commit('news/REMOVE_NEWS', 'newBusiness')
      this.showNewsDialog = false
      this.$router.push('/businessman/list?status=1')
    },

    showNews() {
      this.showNewsDialog = true;
    },
    closeNews() {
      this.showNewsDialog = false;
    },
    sendNews() {
      worksend({
        group: 1,
        message: '{order_id:26}'
      }).then(res => {})
    },

    handleCommand(command) {
      if (command == 2) {
        this.$confirm('确定退出该账号？', '提示', {
          type: 'warning'
        }).then(() => {
          this.logout()
        }).catch()
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: 60px;
  background: #409EFF;
  color: #fff;
  flex-shrink: 0;
  padding: 0 20px;
  .title{
    font-size: 28px;
    margin-right: 10px;
  }
  .el-dropdown{
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
}
.dropdown{
  border: 1px solid #f8f8f8;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px !important;
}

.news-list{
  li{
    border: 1px solid #dcdcdc;
    padding: 10px;
    margin-bottom: 10px;
    line-height: 1.5;
    cursor: pointer;
    &:hover{
      border-color: #409EFF;
    }
    .svg-icon{
      font-size: 16px;
      color: #888;
    }
    .news-mes{
      margin-left: 15px;
      .news-title{
        font-size: 15px;
        margin-bottom: 5px;
        margin-top: 1px;
        color: #333;
      }
      .news-dec{
        font-size: 12px;
        color: #888;
      }
    }
  }
}
</style>