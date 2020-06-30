<template>
  <div class="app-wrapper flex-column">
    <Header />
    <div class="sub-header">
      <p class="sub-title">{{title}}</p>
      <Search />
    </div>
    <div class="flex1">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { Header } from './components'
import Search from '@/components/Search'
import ResizeMixin from './mixin/ResizeHandler'
import { menuData } from '@/utils/menu'

export default {
  name: 'Layout',
  components: {
    Header,
    Search
  },
  data() {
    return {
      title: ''
    }
  },
  watch: {
    '$route': {
      handler() {
        const menu = this.$route.query.menu || this.$route.meta.menu
        try {
          menuData.forEach(item => {
            item.children.forEach(item2 => {
              if (item2.id == menu) {
                throw (item2)
              }
            })
          })
          this.title = '数据概述'
        } catch (e) {
          this.title = e.title
        }
      },
      immediate: true
    }
  },
}
</script>

<style lang="scss" scoped>
.app-wrapper{
  height: 100%;
}
.sub-header{
  background: #fff;
  padding: 0 8px;
  height: 45px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  .sub-title{
    font-size: 16px;
    font-weight: 550;
  }
}
</style>
