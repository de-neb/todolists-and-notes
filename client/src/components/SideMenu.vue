<template>
  <div class="side-menu" id="side-menu" :class="{ 'show-menu': menuActive }">
    <div class="time-container">
      <div class="time">
        <h1>{{ hours }}:{{ minutes }}</h1>
        <div>
          <h3>{{ period }}</h3>
          <h3>{{ weekday }}</h3>
        </div>
      </div>
      <h2>{{ month }} {{ date }} {{ year }}</h2>
    </div>
    <div class="welcome-cont">
      <h3 class="greet">Welcome {{ userInfo[0] }}!</h3>
    </div>
    <div class="log-out-cont">
      <a class="logout" @click="logout"
        ><span class="material-icons logout"> logout </span>Log Out</a
      >
    </div>
    <nav class="side-nav">
      <ul>
        <li>TO-DO LISTS</li>
        <div class="task-list-cont">
          <ul class="task-list">
            <li
              class="task-names"
              v-for="list in lists"
              :class="{ active: list.active && !noteActive }"
              :key="list._id"
            >
              <router-link
                to="/todolist"
                class="task-name-link"
                :class="{ 'notes-tag': list.active && !noteActive }"
                @click.self="selectList(list._id, list.name)"
                :contenteditable="list.isEditable"
              >
                {{ list.name.toUpperCase() }}
              </router-link>
              <span v-if="list.active" class="todo-num">{{ listLenRT }}</span>
              <span
                type="button"
                @click.self="deleteList(list._id)"
                class="material-icons material-icons-outlined x-icon"
                >clear</span
              >
            </li>
          </ul>
        </div>
        <form ref="form">
          <input
            type="text"
            name="list-name"
            placeholder="Enter a list name"
            maxlength="13"
            v-model="listName"
            @keydown.prevent.enter="addList"
            required
            class="list-name-input"
          />
        </form>
        <li id="notes-list" :class="{ active: noteActive }">
          <router-link to="/notes" id="notes-tag">NOTES</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import ReqService from "../ReqService";
export default {
  name: "SideMenu",
  props: {
    lists: Array,
    menuActive: Boolean,
    noteActive: Boolean,
    listLenRT: Number,
    userInfo: Array,
  },
  data() {
    return {
      title: "TO-DO LIST",
      weekday: null,
      weekDayArr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      date: null,
      month: null,
      monthArr: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      year: null,
      hours: null,
      minutes: null,
      seconds: null,
      period: null,
      listName: "",
      activeListId: "",
      itemsLen: null,
    };
  },
  methods: {
    padZero(num) {
      return num < 10 ? String(num).padStart(2, "0") : num;
    },
    setPeriod(hour) {
      return hour < 12 ? "AM" : "PM";
    },
    selectList(id, name) {
      this.activeListId = id;
      this.$emit("active-list", { id, name });
    },
    addList() {
      //problem id not captured
      this.$refs.form.reportValidity();
      this.$emit("add-list", this.listName);
      this.listName = "";
    },
    deleteList(id) {
      this.$emit("delete-list", id);
    },
    timer() {
      setInterval(() => {
        const d = new Date();
        this.weekday = this.weekDayArr[d.getDay()];
        this.date = d.getDate();
        this.month = this.monthArr[d.getMonth()];
        this.year = d.getFullYear();
        this.hours = this.padZero(((d.getHours() + 11) % 12) + 1);
        this.minutes = this.padZero(d.getMinutes());
        this.period = this.setPeriod(d.getHours());
      }, 900);
    },
    async logout() {
      const res = await ReqService.logoutPost();
      const data = await res.data;
      if (data.redirect) {
        this.$router.push("/login");
      }
    },
  },

  mounted() {
    //set live date and time
    this.timer();
  },
  unmounted() {
    clearInterval(this.timer);
  },
};
</script>


<style scoped>
.welcome-cont {
  background: #6053b8;
}

.greet {
  font-size: 2.3rem;
  margin: 1rem 0.5rem 0 0.5rem;
}

.log-out-cont {
  margin-top: 1rem;
  cursor: pointer;
}

.logout {
  color: #edeef7;
  font-size: 1.6rem;
  line-height: 1.6rem;
  text-decoration: none;
  vertical-align: middle;
  font-weight: bold;
}
.log-out-cont:hover {
  background: #878ed3;
}
</style>
