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
    <div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-user-solid"></i>
          {{name}} 
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">账号信息</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
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
</style>