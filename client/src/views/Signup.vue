<template>
  <div class="auth-container">
    <LogoBG class="logo-bg"></LogoBG>
    <form class="form-card">
      <h2 class="title">SIGN UP</h2>
      <div class="input-box">
        <label for="username" class="in-icon"
          ><span class="material-icons in-icon"> person </span></label
        >
        <input
          type="text"
          name="username"
          class="username user-input"
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
          class="user-input"
          placeholder="Password"
          v-model="password"
          required
        />
        <span class="error">{{ pWordErr }}</span>
      </div>
      <vue-recaptcha
        ref="recaptcha"
        v-if="!isVerified && username && password"
        @verify="verifyBot"
        class="recaptcha"
        :sitekey="sitekey"
      ></vue-recaptcha>
      <button
        v-else-if="isVerified"
        class="login-btn"
        @click.prevent="signupPost"
      >
        SIGN UP
      </button>
      <p class="member-q">
        Already a member?
        <router-link to="/login" class="in-link">Log In</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import ReqService from "../ReqService";
import LogoBG from "../components/LogoBG.vue";
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "Signup",
  components: {
    LogoBG,
    VueRecaptcha,
  },
  data() {
    return {
      username: "",
      password: "",
      uNameErr: "",
      pWordErr: "",
      isVerified: false,
      sitekey: "6Le9oToeAAAAAEgFJVHVkXY9yy_G-xrhMMX_wmHa",
    };
  },
  methods: {
    async signupPost() {
      this.uNameErr = "";
      this.pWordErr = "";
      try {
        const res = await ReqService.signupPost(this.username, this.password);
        const data = await res.data;
        if (data.user) {
          this.$router.push("/todolist");
          this.$emit("logged-in", {
            username: data.user.username,
            id: data.user.id,
          });
        }
      } catch ({ response }) {
        const { username, password } = response.data.error;
        if (response.data.error) {
          this.uNameErr = username;
          this.pWordErr = password;
        }
        this.resetRecaptcha();
      }
    },
    resetRecaptcha() {
      this.isVerified = false;
      this.$refs.recaptcha.reset();
    },
    verifyBot(result) {
      this.isVerified = result;
    },
  },
};
</script>

<style>
.recaptcha {
  display: flex;
  justify-content: center;
  width: 100%;
}
.auth-container {
  background: #7868e6;
  display: block;
  position: fixed;
  height: 100%;
  width: 100%;
}
.form-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-52%, -30%);
  width: 350px;
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  box-sizing: border-box;
  gap: 1.8rem;
  padding: 2%;
  text-align: center;
}

h2.title {
  margin: 0;
  font-family: "Saira Condensed", sans-serif;
  font-size: 2.3rem;
  font-weight: bold;
  color: #6053b8;
}

.logo-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.input-box {
  position: relative;
  height: 8%;
}
.input-box label {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 45px;
  color: #edeef7;
  display: grid;
  place-items: center;
}

.user-input {
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 5px;
  background: #a195ee;
  font-size: 1.5rem;
  color: #edeef7;
  padding: 0.6rem 0.6rem 0.6rem 45px;
  font-weight: bold;
  box-sizing: border-box;
}
.username {
  font-family: "Rajdhani", sans-serif;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #b4aaf6 inset;
}

.login-btn {
  height: 3rem;
  border-radius: 5px;
  font-family: "Rajdhani", sans-serif;
  font-weight: bold;
  background: #6053b8;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  color: #edeef7;
}

.login-btn:hover {
  background: #3c3473;
}

.in-link,
.member-q {
  text-align: center;
  text-decoration: none;
  font-size: 1.1rem;
  font-family: "Rajdhani", sans-serif;
  font-weight: bold;
  margin: 0;
}
.in-link:hover {
  color: #9386eb;
}

.error {
  color: #e7305b;
  font-family: "Rajdhani", sans-serif;
  font-weight: bold;
  font-size: 0.9rem;
}

::placeholder {
  color: #edeef7;
  font-family: "Rajdhani", sans-serif;
}

@media (max-width: 500px) {
  .form-card {
    width: 65%;
    gap: 1rem;
  }
  .input-box,
  .in-icon {
    height: 6vh;
    line-height: 6vh;
  }
  .login-btn {
    margin-top: 5%;
    height: 6vh;
  }
}

@media (max-width: 350px) {
 .form-card {
    width: 80%;
  }
}
</style>