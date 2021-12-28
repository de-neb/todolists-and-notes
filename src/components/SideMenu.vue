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
        <li>MY TASK LISTS</li>
        <div class="task-list-cont">
          <ul class="task-list">
            <li
              class="task-names"
              v-for="list in lists"
              :class="{ active: list.active }"
              :key="list._id"
            >
              <a
                class="task-name-link"
                :class="{ 'notes-tag': list.active }"
                href="#"
                @click.self="selectList(list._id, list.name)"
                :contenteditable="list.isEditable"
              >
                {{ list.name.toUpperCase() }}
              </a>
              <span class="todo-num">{{
                list.items.filter((el) => !el.deleted).length
              }}</span>
              <span
                type="button"
                @click.self="deleteList(list._id)"
                class="material-icons material-icons-outlined x-icon"
                >clear</span
              >
            </li>
          </ul>
          <textarea
            rows="1"
            type="text"
            name="list-name"
            placeholder="Enter task list name"
            maxlength="15"
            v-model="listName"
            @keydown.prevent.enter="addList"
          ></textarea>
        </div>
        <li id="notes-list" class="">
          <a href="#NOTES" @click="showNotes" id="notes-tag">NOTES</a>
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
      menuActive: false,
      // lists: [],
      listName: "",
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
      this.$emit("activeList", { id, name });
    },
    addList() {
      this.$emit("updateLists", this.listName);
      this.listName = "";
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
