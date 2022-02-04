<template>
  <div>
    <input type="text" v-model.lazy="user" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: "",
    };
  },
  methods: {
    login() {
      this.$store.commit("setUser", this.user);
      localStorage.user = this.user;
    },
  },
};
</script>
