<template>
  <div id="app">
    <router-view />
    <audio ref="audio" autoplay hidden muted id="audio" src="/static/audio/130808.wav"/>
  </div>
</template>

<script>
import { workbind } from '@/api/user'
export default {
  name: 'App',
  data() {
    return {
      websocket: null
    }
  },
  created(){
    this.initWebSocket()
  },
  destroyed: function() {
    this.websocketclose();
  },
  methods: { 
    initWebSocket(){
      const wsUrl = 'ws://47.106.100.144:2346';
      this.websocket = new WebSocket(wsUrl); 
      this.websocket.onopen = this.websocketonopen;

      this.websocket.onerror = this.websocketonerror;

      this.websocket.onmessage = this.websocketonmessage; 
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
        console.log("WebSocket连接成功");
    },
    websocketonerror(e) { //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e){ //数据接收
      const res = JSON.parse(e.data);
      // 接收数据
      console.log('----------------------')
      console.log(res); 
      console.log('----------------------')

      if (res.type == 'init') {
        workbind({
          client_id: res.client_id
        }).then(() => {}).catch(() => {})
      } else if (res.type == 'ping') {

      } else {
        this.$notify({
          title: '收到一条信息',
          message: res.message,
          duration: 1000,
          offset: 50
        })
        this.$store.commit('news/ADD_NEWS', res)
        this.$refs.audio.muted = false
        this.$refs.audio.play()
      }
    },
    websocketsend(agentData){//数据发送 
      this.websock.send(agentData); 
    }, 
    websocketclose(e){ //关闭 
      console.log("connection closed")
    }
  }
}
</script>