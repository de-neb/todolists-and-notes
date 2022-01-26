<template>
  <div class="container login">
    <LogoBG class="logo-bg"></LogoBG>

    <form class="form-card">
      <h2 class="title">LOG IN</h2>

      <div class="input-box">
        <label for="username" class="in-icon"
          ><span class="material-icons in-icon"> person </span></label
        >
        <input
          type="text"
          name="username"
          class="username"
          placeholder="Username"
          v-model="username"
          required
        />
        <span class="error">{{ uNameErr }}</span>
      </div>
      <div class="input-box">
        <label for="password" class="in-icon"
          ><span class="material-icons in-icon"> lock </span></label
        >
        <input
          type="password"
          name="password"
          class="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <span class="error">{{ pWordErr }}</span>
      </div>

      <button class="login-btn" @click.prevent="loginPost">LOG IN</button>
      <router-link to="/signup" class="sign-in-link">New User?</router-link>
    </form>
  </div>
</template>

<script>
import ReqService from "../ReqService";
import LogoBG from "../components/LogoBG.vue";
export default {
  name: "Login",
  components: {
    LogoBG,
  },
  data() {
    return {
      username: "",
      password: "",
      uNameErr: "",
      pWordErr: "",
    };
  },
  methods: {
    async loginPost() {
      this.uNameErr = "";
      this.pWordErr = "";
      this.isEmpty = false;
      try {
        const res = await ReqService.loginPost(this.username, this.password);
        const data = await res.data;
        if (data.user) {
          this.$router.push("/todolist");
          this.$emit("logged-in", {
            username: data.user.username,
            id: data.user.id,
          });
          //set cookie uid at 1st log in
          if (!document.cookie) {
            document.cookie = `uid=${data.user.id}`;
          }
        }
      } catch ({ response }) {
        const { username, password } = response.data.error;
        if (response.data.error) {
          this.uNameErr = username;
          this.pWordErr = password;
        }
      }
    },
  },
};
</script>

<style>
</style>