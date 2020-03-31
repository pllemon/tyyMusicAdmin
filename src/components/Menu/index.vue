<template>
  <el-menu :default-active="activeIndex" mode="horizontal" router>
    <el-submenu v-for="(item, index) in menuData" :key="index" :index="item.title" router>
      <template slot="title">{{item.title}}</template> 
      <el-menu-item v-for="(item2, index2) in item.children" :key="index2" :index="item2.path">{{item2.title}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { menuData } from '@/utils/menu'

export default {
  data() {
    return {
      activeIndex: '/system/concat',
      menuData
    }
  },
}
</script>

<style lang="scss">
.el-menu{
  background: none;
  .el-submenu{
    &:hover{
      .el-submenu__title{
        color: #fff;
        padding: 0;
      }
    }
    .el-submenu__title{
      color: #fff;
      
    }
  }
}
.el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
  display: none;
}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, 
.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, 
.el-menu--horizontal>.el-submenu .el-submenu__title:hover{
  background: none;
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
  color: #fff;
}
.el-submenu__title:focus, .el-submenu__title:hover{
  background: none;
}
.el-menu--horizontal>.el-submenu:focus .el-submenu__title, 
.el-menu--horizontal>.el-submenu:hover .el-submenu__title{
  color: #fff;
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
  border-bottom: 2px solid #81efff;
  color: #81efff;
  font-weight: bold;
}
.el-menu--horizontal>.el-submenu .el-submenu__title{
  height: 40px;
  line-height: 40px;
  padding: 0;
  margin: 0 15px;
  font-size: 16px;
}
.el-menu.el-menu--horizontal{
  border-bottom: none;
}
.el-menu--popup{
  background: #fff;
}
</style>