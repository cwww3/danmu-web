<template>
  <div>
    <Login v-if="!this.$store.state.user" />
    <div v-else>
      <router-link to="/watch">观看直播</router-link>
      <router-link to="/setting">直播设置</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Login from "./Login.vue";
// import Room from "./Room.vue";

export default {
  name: "Index",
  components: {
    Login,
    // Room,
  },
  beforeCreate() {
    if (localStorage.user) {
      this.$store.commit("setUser", localStorage.user);
    }
  },
};
</script>
