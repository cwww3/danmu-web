<template>
  <div>
    <div v-for="msg in this.msgList" :key="msg.id">
      <span>{{ msg.user }}:</span><span>{{ msg.content }}</span>
    </div>
  </div>
</template>

<script>
import request from "../request";
export default {
  name: "History",
  props: ["room"],
  data() {
    return {
      msgList: [],
    };
  },
  methods: {},
  mounted() {
    this.msgList = request
      .get(`api/${this.room}/message`)
      .then((response) => {
        if (response.status === 200) {
          this.msgList = response.data.msgList;
        }
      });
    this.$EventBus.$on("addMsg", (msg) => this.msgList.push(msg));
  },
};
</script>
