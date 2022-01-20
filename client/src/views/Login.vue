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
        />
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
        />
      </div>

      <button class="login-btn">LOG IN</button>
      <router-link to="/signup" class="sign-in-link">New User?</router-link>
    </form>
  </div>
</template>

<script>
import LogoBG from "../components/LogoBG.vue";
export default {
  name: "Login",
  components: {
    LogoBG,
  },
};
</script>

<style>
.container .login {
  background: #7868e6;
}
.form-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-52%, -30%);
  width: 400px;
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
  font-size: 2.7rem;
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
  height: 55px;
}
.input-box label {
  position: absolute;
  left: 0;
  top: 0;
  width: 45px;
  color: #edeef7;
}

.in-icon {
  line-height: 51px;
}

.username,
.password {
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

.login-btn {
  height: 2.4em;
  border-radius: 5px;
  font-family: "Rajdhani", sans-serif;
  font-weight: bold;
  background: #6053b8;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  color: #edeef7;
  margin-top: 1rem;
}

.login-btn:hover {
  background: #3c3473;
}

.sign-in-link {
  text-align: center;
  text-decoration: none;
  font-size: 1.1rem;
  font-family: "Rajdhani", sans-serif;
  font-weight: bold;
}
.sign-in-link:hover {
  color: #9386eb;
}

::placeholder {
  color: #edeef7;
  font-family: "Rajdhani", sans-serif;
}

@media (max-width: 500px) {
  .form-card {
    width: 80%;
    gap: 1rem;
  }
  .input-box,
  .in-icon {
    height: 6vh;
    line-height: 6vh;
  }
  .login-btn {
    margin-top: 5%;
    height: 7vh;
  }
}
</style>