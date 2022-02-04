<template>
  <div>
    <div v-for="msg in this.msgList" :key="msg.id">
      <span>{{ msg.user }}:</span><span>{{ msg.content }}</span>
    </div>
  </div>
</template>

<script>
import request from "../request";
import PubSub from "pubsub-js";

export default {
  name: "History",
  props: ["room"],
  data() {
    return {
      msgList: [],
      pubId: 0,
    };
  },
  methods: {},
  mounted() {
    this.msgList = request.get(`api/${this.room}/message`).then((response) => {
      if (response.status === 200) {
        this.msgList = response.data.msgList;
      }
    });
    this.pubId = PubSub.subscribe("addMsg", (msgName, data) => {
      this.msgList.push(data);
    });
  },
  beforeDestroy() {
    PubSub.unsubscribe(this.pubId);
  },
};
</script>
