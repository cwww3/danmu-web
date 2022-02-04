<template>
  <div>
    <div id="id1">
      <!-- <div>
        {{ room && !loaded ? "加载中" : "" }}
      </div> -->
      <!-- muted controls  -->
      <video
        id="videoElement"
        ref="videoElement"
        width="800px"
        height="600px"
        controls
      ></video>

      <!-- <button v-if="this.room && this.loaded" @click="swith">
        {{ playing ? "暂停" : "播放" }}
      </button> -->
    </div>
    <div id="id2">
      <vue-baberrage :isShow="true" :barrageList="this.barrageList">
      </vue-baberrage>
    </div>
    <div id="id3">
      <Chat v-if="this.room" :room="this.room" />
    </div>
  </div>
</template>

<script>
import Chat from "./Chat.vue";
import { MESSAGE_TYPE } from "vue-baberrage";
import flvjs from "flv.js";
import PubSub from "pubsub-js";

export default {
  name: "Live",
  components: {
    Chat,
  },
  props: ["room"],
  data() {
    return {
      id: 1,
      flvPlayer: null,
      barrageList: [],
      pubId: 0,
    };
  },
  methods: {
    //创建flv视频实例
    createFlv(room) {
      let url = "http://110.42.134.163/live?app=cwww3&stream=test";
      if (room === "default") {
        url = "http://110.42.134.163/live?app=cwww3&stream=test";
      } else {
        url = "";
      }
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          url,
        });
        this.flvPlayer.on("error", () => {
          alert("加载失败,直播未开始或刷新重试");
        });

        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
      } else {
        alert("不支持播放");
      }
    },
    flvDestroy() {
      if (this.flvPlayer) {
        this.flvPlayer.pause();
        this.flvPlayer.unload();
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
        this.flvPlayer = null;
      }
    },
    addToList(msg) {
      this.barrageList.push(msg);
      // {
      //   id: this.id,
      //   avatar: "",
      //   msg: "test!",
      //   time: 5,
      //   type: MESSAGE_TYPE.NORMAL,
      // }
    },
  },
  mounted() {
    this.$EventBus.$on("select", (room) => {
      this.flvDestroy();
      if (room) {
        this.createFlv(room);
      }
    });
    this.pubId = PubSub.subscribe("addMsg", (msgName, data) => {
      let msg = {
        id: data.id,
        avatar: "/favicon.ico",
        msg: data.content,
        time: 5,
        type: MESSAGE_TYPE.NORMAL,
      };
      this.addToList(msg);
    });
  },
  beforeDestroy() {
    this.flvDestroy();
    PubSub.unsubscribe(this.pubId);
  },
};
</script>

<style scoped>
#id1 {
  /* border: 1px solid #ff0000; */
  position: absolute;
  width: 800px;
  height: 600px;
  z-index: 0;
  /* left: 600px; */
  /* top: 170px; */
  text-align: center;
}
#id2 {
  /* border: 0px solid #ff0000; */
  position: absolute;
  width: 800px;
  height: 600px;
  /* left: 600px;
  top: 170px; */
  z-index: 10;
}
#id3 {
  /* border: 0px solid #ff0000; */
  position: absolute;
  width: 200px;
  height: 600px;
  left: 1000px;
  /* top: 170px; */
  z-index: 10;
}
</style>