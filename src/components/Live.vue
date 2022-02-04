<template>
  <div>
    <div>
      <div>
        {{ room && !loaded ? "加载中" : "" }}
      </div>
      <video
        id="videoElement"
        ref="videoElement"
        muted
        width="100%"
        height="100%"
      ></video>
      <button v-if="this.room && this.loaded" @click="swith">
        {{ playing ? "暂停" : "播放" }}
      </button>
    </div>
    <Chat v-if="this.room" :room="this.room" />
  </div>
</template>

<script>
import Chat from "./Chat.vue";
import flvjs from "flv.js";
export default {
  name: "Live",
  components: {
    Chat,
  },
  props: ["room"],
  data() {
    return {
      flvPlayer: null,
      playing: true,
      loaded: false,
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
          hasAudio: false,
          url,
        });
        this.flvPlayer.on("error", () => {
          alert("加载失败,直播未开始或刷新重试");
        });

        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play().then(() => {
          this.loaded = true;
        });
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
    swith() {
      if (this.flvPlayer) {
        if (this.playing) {
          this.flvPlayer.pause();
        } else {
          this.flvPlayer.play();
        }
        this.playing = !this.playing;
      } else {
        alert("操作失败");
      }
    },
  },
  mounted() {
    this.$EventBus.$on("select", (room) => {
      this.flvDestroy();
      if (room) {
        this.createFlv(room);
      }
    });
  },
  beforeDestroy() {
    this.flvDestroy();
  },
};
</script>
