<template>
  <div>
    <History :room="this.room" />
    <Talk :room="this.room" />
  </div>
</template>

<script>
import History from "./History.vue";
import Talk from "./Talk.vue";
import PubSub from "pubsub-js";

export default {
  name: "Chat",
  components: { History, Talk },
  props: ["room"],
  data() {
    return {
      ws: null,
    };
  },
  methods: {
    //进入页面创建websocket连接
    initWebSocket(room) {
      //判断页面有没有存在websocket连接
      if (window.WebSocket) {
        this.ws = new WebSocket("ws://110.42.134.163/ws/" + room); // 开发
        // let ws = new WebSocket("ws://localhost/ws/" + room); // 本地测试
        this.ws.onopen = function (e) {
          console.log("服务器连接成功", e);
        };
        this.ws.onclose = function (e) {
          console.log("服务器连接关闭", e);
        };
        this.ws.onerror = function () {
          console.log("服务器连接出错");
        };
        this.ws.onmessage = function (e) {
          //接收服务器返回的数据
          let msg = JSON.parse(e.data);
          PubSub.publish("addMsg", msg);
        };
      }
    },
  },
  mounted() {
    this.initWebSocket(this.room);
    this.$EventBus.$on("send", (msg) => {
      msg.user = this.$store.state.user;
      this.ws.send(JSON.stringify(msg));
    });
  },
  beforeDestroy() {
    this.ws.close();
  },
};
</script>
