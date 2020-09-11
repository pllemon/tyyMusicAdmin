<template>
  <div id="app">
    <router-view />
    <audio ref="audio" muted controls id="audio" src="http://downsc.chinaz.net/Files/DownLoad/sound1/201706/8855.wav" style="position:fixed;top:0;left:0;display:none"/>
    <!-- 弹窗 -->
    <component :is="currentComponent" :dialogMes="dialogMes"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { workbind } from '@/api/user'
import OrderDetails from '@/views/order/details'
export default {
  name: 'App',
  components: {
    OrderDetails
  },
  data() {
    return {
      currentComponent: '',
      dialogMes: {}
    }
  },
  mounted() {
    $(document).click(() => {
      if (this.$refs.audio) {
        this.$refs.audio.muted = false
      }
    })
  },
  methods: {
   
  },
  watch: {
    isRing: {
        handler(val) {
          if (val) {
            console.log('响铃')
            this.$refs.audio.play()
            this.$store.commit('news/setRing', false)
          }
        },
        deep: true
    }
  },
  computed: {
    ...mapGetters([
      'isRing'
    ])
  },
}
</script>

<style lang="scss">
.websocket-notify{
  .el-icon-s-custom,
  .el-icon-user-solid{
    color: #409EFF;
  }
  .el-icon-s-finance{
    color: #E6A23C;
  }
  .el-icon-s-claim{
    color: #67C23A;
  }
}
</style>
