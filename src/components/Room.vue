<template>
  <div>
    <h2>用户:{{ this.$store.state.user }}</h2>
    <select v-model="selectedRoom">
      <option value="">请选择房间</option>
      <option v-for="room in this.rooms" :key="room.id">
        {{ room.name }}
      </option>
    </select>
    <button @click="entry">确定</button>
    <!-- <router-link :to="`/entry?room=${this.selected}`">进入</router-link> -->

    <Live :room="this.room" />
    <!-- <router-link
      :to="{
        path: '/entry',
        query: {
          room: this.selected,
        },
      }"
      >进入</router-link
    >

    <router-view></router-view> -->
  </div>
</template>

<script>
import Live from "./Live.vue";
import request from "../request";
export default {
  name: "Room",
  components: {
    Live,
  },
  data() {
    return {
      rooms: [],
      selectedRoom: "",
      room: this.selectedRoom,
    };
  },
  methods: {
    entry() {
      this.room = this.selectedRoom;
      this.$EventBus.$emit("select", this.selectedRoom);
    },
  },
  mounted() {
    request.get("api/liveon/room").then((response) => {
      if (response.status !== 200) {
        alert("获取直播间失败");
        return;
      }
      this.rooms = response.data.data;
    });
  },
};
</script>
