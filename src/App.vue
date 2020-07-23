<template>
  <div id="app">
    <router-view />
    <audio ref="audio" muted controls id="audio" src="http://downsc.chinaz.net/Files/DownLoad/sound1/201706/8855.wav" style="position:fixed;top:0;left:0;display:none"/>
    <!-- 弹窗 -->
    <component :is="currentComponent" :dialogMes="dialogMes"/>
  </div>
</template>

<script>
import { workbind } from '@/api/user'
import OrderDetails from '@/views/order/details'
export default {
  name: 'App',
  components: {
    OrderDetails
  },
  data() {
    return {
      websocket: null,
      currentComponent: '',
      dialogMes: {}
    }
  },
  created(){
    this.initWebSocket()
  },
  mounted() {
    $(document).click(() => {
      if (this.$refs.audio) {
        this.$refs.audio.muted = false
      }
    })
  },
  destroyed: function() {
    this.websocketclose()
  },
  methods: {
    initWebSocket(){
      this.websocket = new WebSocket('ws://120.25.25.90:2346')
      this.websocket.onopen = this.websocketonopen
      this.websocket.onerror = this.websocketonerror
      this.websocket.onmessage = this.websocketonmessage
    },
    websocketonopen() {
        console.log("WebSocket连接成功");
    },
    websocketonerror(e) { //错误
      console.log("WebSocket连接发生错误")
      setTimeout(() => {
        this.initWebSocket()
      }, 1000)
    },
    websocketonmessage(e){ //数据接收
      const that = this
      const res = JSON.parse(e.data)
      if (res.type == 'init') {
        workbind({
          client_id: res.client_id
        }).then(() => {}).catch(() => {})
      } else if (res.type == 'ping') {

      } else {
        console.log(res)
        // const timeStamp = new Date().getTime()
        let notify = null
        const message = JSON.parse(res.message)
        if (res.type == 'makeOrder') {
          that.showNotify({
            title: '新订单',
            message: `用户 ${message.name}（${message.phone}）下了个新订单，赶紧接单吧！`,
            icon: 'el-icon-s-claim',
            callback() {
              that.dialogMes = {id: message.order_id}
              that.currentComponent = 'OrderDetails'
            }
          })
        } else if (res.type == 'payEarnest') {
          that.showNotify({
            title: '用户已支付',
            message: `订单编号 ${message.orderSn} ，用户已支付，赶紧为TA发布订单吧！`,
            icon: 'el-icon-s-finance',
            callback() {
              that.dialogMes = {id: message.order_id}
              that.currentComponent = 'OrderDetails'
            }
          })
        } else if (res.type == 'newMaster') {
          that.showNotify({
            title: '师傅申请',
            message: `用户 ${message.name}（${message.phone}）申请成为师傅，赶紧处理吧！`,
            icon: 'el-icon-user-solid',
            url: ''
          })
        } else if (res.type == 'newBusiness') {
          that.showNotify({
            title: '商家申请',
            message: `用户 ${message.name}（${message.phone}）申请成为商家，赶紧处理吧！`,
            icon: 'el-icon-s-custom',
            url: ''
          })
        } else {
          console.log(res.message)
        }
        // this.notifications[timeStamp] = notify;
        // this.$store.commit('news/ADD_NEWS', res)

        that.$refs.audio.play()
      }
    },

    showNotify(obj) {
      let that = this
      let notify = that.$notify({
        title: obj.title || '通知',
        message: obj.message || '',
        duration: 0,
        offset: 50,
        iconClass: obj.icon || 'el-icon-warning-outline',
        customClass: 'websocket-notify',
        onClick: function() {
          notify.close()
          if (obj.url) {
            that.$route.push(obj.url)
          }
          if (obj.callback) {
            obj.callback()
          }
        }
      })
    },

    closeNotify(timeStamp) {
      this.notifications[timeStamp].close()
      delete this.notifications[timeStamp]
    }
  }
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
