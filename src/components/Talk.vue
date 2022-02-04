<template>
  <div>
    <textarea v-model="content"></textarea>
    <button @click="send">发送</button>
  </div>
</template>

<script>
export default {
  name: "Talk",
  props: ["room"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    send() {
      if (this.content.trim().length) {
        let msg = {
          user: this.$store.state.user,
          content: this.content,
          room: this.room
        };
        this.$EventBus.$emit("send", msg);
        this.content = "";
      } else {
        alert("输入不能为空");
      }
    },
  },
};
</script>
