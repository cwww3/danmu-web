<template>
  <div>
    <Login v-if="!this.$store.state.user" />
    <Room v-else />
  </div>
</template>

<script>
import Login from "./Login.vue";
import Room from "./Room.vue";

export default {
  name: "Index",
  components: {
    Login,
    Room,
  },
  beforeCreate() {
    if (localStorage.user) {
      this.$store.commit("setUser",localStorage.user)
    }
  },
};
</script>
