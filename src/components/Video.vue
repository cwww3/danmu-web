<template>
  <div>
    <!-- <video width="320" height="240" autoplay muted>
      <source src="../assets/intro.mp4" type="video/mp4" />
    </video> -->
    <!-- controls -->
    <video
      id="videoElement"
      ref="videoElement"
      muted
      width="100%"
      height="100%"
    ></video>
    <button @click="swith">{{ playing ? "暂停" : "播放" }}</button>
  </div>
</template>

<script>
import flvjs from "flv.js";
export default {
  name: "Video",
  data() {
    return {
      flvPlayer: null,
      playing: true,
    };
  },
  methods: {
    //创建flv视频实例
    createFlv() {
      let url = "http://110.42.134.163/live?app=cwww3&stream=test";
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false,
          url,
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
    this.createFlv();
  },
  beforeDestroy() {
    this.flvDestroy();
  },
};
</script>
