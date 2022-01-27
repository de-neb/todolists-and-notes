<template>
  <div
    class="container"
    v-if="currentRoute === 'Login' || currentRoute === 'Signup'"
  >
    <router-view @logged-in="getUserInfo"> </router-view>
    <a href="https://github.com/denksy" class="credit">
      <span>Created by</span>
      <img src="~@/assets/den.png" alt="den" width="30" />
    </a>
  </div>
  <div class="container" v-else-if="path === '/notes' || path === '/todolist'">
    <router-view :uid="userId" :user="user"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      currentRoute: "",
      userId: "",
      path: "",
      user: "",
    };
  },
  methods: {
    getUserInfo({ username, id }) {
      this.user = username;
      this.userId = id;
    },
  },
  watch: {
    $route(newVal) {
      this.currentRoute = newVal.name;
      this.path = newVal.path;
    },
  },
};
</script>

<style scoped>
.bar-route-container {
  width: inherit;
  position: relative;
}

.show {
  display: flex !important;
}

@media (max-width: 800px) {
  .blur-bg {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
  }

  .z-index-2 {
    z-index: 9;
  }
}
</style>
