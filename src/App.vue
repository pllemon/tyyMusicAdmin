<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      websocket: null,
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
      const redata = JSON.parse(e.data);
      // 接收数据
      console.log(redata.value); 
    },
    websocketsend(agentData){//数据发送 
      this.websock.send(agentData); 
    }, 
    websocketclose(e){ //关闭 
      console.log("connection closed (" + e.code + ")"); 
    }
  }
}
</script>