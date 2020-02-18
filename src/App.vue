<template>
  <div id="app">
    <router-view />
    <audio ref="audio" muted controls id="audio" src="http://downsc.chinaz.net/Files/DownLoad/sound1/201706/8855.wav" style="position:fixed;top:0;left:0;display:none"/>
  </div>
</template>

<script>
import { workbind } from '@/api/user'
export default {
  name: 'App',
  data() {
    return {
      websocket: null,
      notifications: {}
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
      const wsUrl = 'ws://47.106.100.144:2346'
      this.websocket = new WebSocket(wsUrl)
      this.websocket.onopen = this.websocketonopen
      this.websocket.onerror = this.websocketonerror
      this.websocket.onmessage = this.websocketonmessage
      this.websocket.onclose = this.websocketclose
    },
    websocketonopen() {
        console.log("WebSocket连接成功");
    },
    websocketonerror(e) { //错误
      console.log("WebSocket连接发生错误")
      this.initWebSocket()
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
        const timeStamp = new Date().getTime()
        let notify = null
        const message = JSON.parse(res.message)
        if (res.type == 'makeOrder') {
          notify = this.$notify({
            title: '新订单',
            message: `用户 ${message.name}（${message.phone}）下了个新订单，赶紧接单吧！`,
            duration: 0,
            offset: 50,
            onClick: function() {
              that.closeNotify(timeStamp)
              that.$router.push('/order/list?order_sn=' + orderSn)
            }
          })
        } else if (res.type == 'payEarnest') {
          notify = this.$notify({
            title: '用户已支付定金',
            message: `订单编号 ${message.orderSn} ，用户已支付定金，赶紧为TA发布订单吧！`,
            duration: 0,
            offset: 50,
            onClick: function() {
              that.closeNotify(timeStamp)
              that.$router.push('/order/list?order_sn=' + orderSn)
            }
          })
        } else if (res.type == 'payTail') {
          notify = this.$notify({
            title: '用户已支付尾款',
            message: `订单编号 ${message.orderSn} ，用户已支付尾款，订单已完成！`,
            duration: 0,
            offset: 50,
            onClick: function() {
              that.closeNotify(timeStamp)
              that.$router.push('/order/list?order_sn=' + orderSn)
            }
          })
        } else if (res.type == 'newMaster') {
          notify = this.$notify({
            title: '师傅申请',
            message: `用户 ${message.name}（${message.phone}）申请成为师傅，赶紧处理吧！`,
            duration: 0,
            offset: 50,
            onClick: function() {
              that.closeNotify(timeStamp)
            }
          })
        } else if (res.type == 'newBusiness') {
          notify = this.$notify({
            title: '商家申请',
            message: `用户 ${message.name}（${message.phone}）申请成为商家，赶紧处理吧！`,
            duration: 0,
            offset: 50,
            onClick: function() {
              that.closeNotify(timeStamp)
            }
          })
        } else {
          this.$notify({
            title: '收到一条信息',
            message: res.message,
            duration: 5000,
            offset: 50
          })
        }
        this.notifications[timeStamp] = notify;
        this.$store.commit('news/ADD_NEWS', res)

        this.$refs.audio.play()
      }
    },
    websocketsend(agentData){//数据发送
      this.websock.send(agentData);
    },
    websocketclose(e){ //关闭
      console.log("WebSocket连接中断")
      this.initWebSocket()
    },

    closeNotify(timeStamp) {
      this.notifications[timeStamp].close()
      delete this.notifications[timeStamp]
    }
  }
}
</script>
