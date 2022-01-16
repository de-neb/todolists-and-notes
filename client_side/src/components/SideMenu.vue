<template>
  <div class="side-menu" id="side-menu" :class="{ 'show-menu': menuActive }">
    <div class="time-container">
      <div class="time">
        <h1>{{ hours }}:{{ minutes }}</h1>
        <span>{{ period }}</span>
      </div>
      <h2>{{ month }} {{ date }} {{ year }}</h2>
      <h3>{{ weekday }}</h3>
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
                to="/"
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
          <form ref="form">
            <input
              type="text"
              name="list-name"
              placeholder="Enter a list name"
              maxlength="13"
              v-model="listName"
              @keydown.prevent.enter="addList"
              required
            />
          </form>
        </div>
        <li id="notes-list" :class="{ active: noteActive }">
          <router-link to="/notes" id="notes-tag">NOTES</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    lists: Array,
    menuActive: Boolean,
    noteActive: Boolean,
    listLenRT: Number,
  },
  data() {
    return {
      title: "TO-DO LIST",
      weekday: null,
      weekDayArr: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      date: null,
      month: null,
      monthArr: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
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
      this.$emit("activeList", { id, name });
    },
    addList() {
      //problem id not captured
      this.$refs.form.reportValidity();
      this.$emit("addList", this.listName);
      this.listName = "";
    },
    deleteList(id) {
      this.$emit("deleteList", id);
    },
  },

  mounted() {
    //set live date and time
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
};
</script>


<style scoped>
</style>
