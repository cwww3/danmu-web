<template>
  <div>
    <div v-if="!this.room">
      <input v-model.trim="name" placeholder="请输入房间名,要求英文字符" />
      <button @click="create">创建直播间</button>
    </div>
    <div v-else>
      <span>房间名:{{ this.room.name }}</span>
      <button v-if="!this.on" @click="open">开启直播</button>
      <button v-if="this.on" @click="close">关闭直播</button>
     
     
      <span v-if="this.on">推流地址:{{ this.room.url }} 推流秘钥:{{this.room.name}}</span>
    </div>
  </div>
</template>

<script>
import request from "../request";
export default {
  name: "Setting",
  data() {
    return {
      name: "",
      room: null,
      on: false,
    };
  },
  methods: {
    create() {
      // 校验room名
      let re = /[A-Za-z]+/;
      if (!re.test(this.name)) {
        alert("名字不符合要求,只允许英文字母");
        return;
      }
      request
        .post("api/room", {
          user: this.$store.state.user,
          name: this.name,
        })
        .then((response) => {
          if (response.status === 200 && response.data.code === "00000") {
            this.room = response.data.data;
          }
        });
    },
    open() {
      request.post(`api/liveon/${this.$store.state.user}`).then((response) => {
        if (response.status === 200 && response.data.code === "00000") {
          this.on = true;
        }
      });
    },
    close() {
      request.post(`api/liveoff/${this.$store.state.user}`).then((response) => {
        if (response.status === 200 && response.data.code === "00000") {
          this.on = false;
        }
      });
    },
  },
  mounted() {
    // 根据用户名称获取直播间
    request.get(`api/room?user=${this.$store.state.user}`).then((response) => {
      if (response.status !== 200) {
        alert("获取直播间信息失败");
        return;
      }

      if (response.data.code === "00000") {
        this.room = response.data.data;
      }
    });

    request.get(`api/liveon/room`).then((response) => {
      if (response.status === 200 && response.data.code === "00000") {
        let room = response.data.data[this.$store.state.user];
        if (room) {
          this.on = true;
        }
      } else {
        alert("获取直播状态失败");
      }
    });
  },
};
</script>
