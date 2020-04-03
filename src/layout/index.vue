<template>
  <div class="app-wrapper flex-column">
    <Header />
    <Search />
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

export default {
  name: 'Layout',
  components: {
    Header,
    Search
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper{
  height: 100%;
}
</style>
