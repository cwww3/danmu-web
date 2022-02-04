<template>
  <div>
    <h2>用户:{{ this.$store.state.user }}</h2>
    <select v-model="selectedRoom">
      <option value="">请选择房间</option>
      <option v-for="(room, index) in this.rooms" :key="index">
        {{ room }}
      </option>
    </select>
    <button @click="entry">确定</button>
    <!-- <router-link :to="`/entry?room=${this.selected}`">进入</router-link> -->

    <Live :room="this.room"/>
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
export default {
  name: "Room",
  components: {
    Live,
  },
  data() {
    return {
      rooms: ["default"],
      selectedRoom: "",
      room: this.selectedRoom,
    };
  },
  methods: {
    entry() {
      this.room = this.selectedRoom
      this.$EventBus.$emit("select",this.selectedRoom)
    }
  }
};
</script>
