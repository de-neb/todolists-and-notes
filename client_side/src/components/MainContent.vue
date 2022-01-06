<template>
  <div class="main">
    <!-- top bar -->
    <TopBar
      :activeListName="activeListName"
      :listsLen="lists.length"
      @burgerClick="burgerClick"
    ></TopBar>

    <div class="todos-cont" v-if="lists.length">
      <div
        v-for="todoItem in items"
        :key="todoItem"
        class="item-cont"
        :id="'item-cont-' + todoItem._id"
      >
        <div class="top" :id="'todo-' + todoItem.title">
          <div class="priority-flag" :class="todoItem.priority"></div>
          <label :for="'check-' + todoItem._id"></label>
          <input
            type="checkbox"
            :id="'check-' + todoItem._id"
            class="checkbox"
            v-model="todoItem.done"
          />
          <span :class="{ check: todoItem.done }" class="no-check"></span>
          <input type="text" class="item" v-model="todoItem.title" />
          <button class="expand" @click="expandItem(todoItem._id)">
            <div :class="{ rotating: todoItem.expandedItem }">
              <span class="material-icons material-icons-outlined">
                expand_more
              </span>
            </div>
          </button>
        </div>
        <div
          class="expanded-cont"
          :id="'expanded-cont-' + todoItem.title"
          :class="{ expanding: todoItem.expandedItem }"
        >
          <div class="date-priority-cont">
            <div class="date-cont">
              <label :for="'date-' + todoItem.title"> Due Date </label>
              <input
                type="date"
                class="date"
                :id="'date-' + todoItem.title"
                v-model="todoItem.date"
              />
            </div>
            <div class="priority-cont">
              <label :for="'priority-' + todoItem.title">Priority</label>
              <select
                name="priority"
                :id="'priority-' + todoItem.title"
                v-model="todoItem.priority"
              >
                <option value="Low" selected="selected">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div class="details-cont">
            <label :for="'details-' + todoItem.title">Details</label>
            <textarea
              name="details"
              :id="'details-' + todoItem.title"
              v-model="todoItem.details"
            ></textarea>
          </div>

          <div class="btn-save-del">
            <button class="save" @click="updateItems(todoItem._id)">
              <span class="material-icons material-icons-outlined"> save </span>
              &nbsp; Save
            </button>
            <button
              class="del"
              @click="deleteItem(todoItem._id, todoItem.title)"
            >
              <span class="material-icons material-icons-outlined">
                delete
              </span>
              &nbsp; Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="add-item" v-if="lists.length">
      <div class="add-item-cont">
        <span class="material-icons material-icons-outlined" @click="addItem()"
          >add</span
        >
        <input
          type="text"
          name="itemTitle"
          :id="'todo-' + lists[activeListId]"
          maxlength="55"
          v-model="itemTitle"
          @keydown.enter="addItem()"
          placeholder="Type your 'to-do' here"
        />
      </div>
    </div>

    <!-- delete/ clear item actions -->
    <div class="clear" v-if="lists.length">
      <button class="clear-done" @click="clearDoneItems">
        <span class="material-icons material-icons-outlined">
          cleaning_services
        </span>
        <span class="tooltip-text">Clear done items</span>
      </button>
      <button class="delete-all" @click="deleteAllItems">
        <span class="material-icons material-icons-outlined">
          delete_sweep
        </span>
        <span class="tooltip-text">Delete all items</span>
      </button>
    </div>

    <div v-if="!lists.length" class="no-task-item">
      <h2>You don't have any list added to your task list! :(</h2>
      <h4 class="sub-text">Enter a list name on the side to create one!</h4>
    </div>
    <div v-else-if="items && !items.length" class="no-todo-item">
      <h2>This task list seems to be empty :(</h2>
      <h4 class="sub-text">To add an item, type a to-do then hit enter!</h4>
    </div>
  </div>
</template>

<script>
import ReqService from "../ReqService";
import TopBar from "./TopBar.vue";

export default {
  name: "MainContent",
  props: {
    lists: Array,
    activeListId: String,
    activeListName: String,
    toDeleteItems: Boolean,
  },
  components: {
    TopBar,
  },
  data() {
    return {
      menuActive: false,
      items: [],
      itemTitle: "",
      expandChecker: false,
      showModal: false,
    };
  },
  methods: {
    async fetchItems() {
      const result = await ReqService.getItems(this.activeListId);
      const data = await result;
      this.items = data.items;
    },
    async addItem() {
      await ReqService.addItem(this.activeListId, this.itemTitle);
      //animation wont play if not inside .then
      this.fetchItems().then(() => this.appearItem());
      this.itemTitle = "";
    },
    async deleteItem(itemId, title) {
      this.animationDelete(title, itemId);
      await ReqService.deleteItem(this.activeListId, itemId);
      this.fetchItems();
    },
    async updateItems(itemId) {
      //minimize item after clicking "save"
      this.items.forEach((item) => {
        if (item._id === itemId && item.expandedItem) {
          item.expandedItem = this.expandChecker;
        }
      });
      //upates item in db
      await ReqService.updateItems(this.activeListId, this.items);
      this.fetchItems();
    },
    animationDelete(title, itemId) {
      const itemBar = document.getElementById("todo-" + title);
      const itemDet = document.getElementById("expanded-cont-" + title);
      const itemCont = document.getElementById("item-cont-" + itemId);
      itemBar.classList.add("deleting");
      itemDet.classList.add("deleting");
      itemCont.classList.add("shrink");
    },
    expandItem(itemId) {
      this.items.forEach((item) => {
        if (item._id === itemId && !item.expandedItem) {
          item.expandedItem = !this.expandChecker;
        } else {
          item.expandedItem = this.expandChecker;
        }
      });
    },
    appearItem() {
      //animation for adding item
      if (!this.items.includes(this.itemTitle)) {
        setTimeout(() => {
          const itemCont = document.getElementById(
            "item-cont-" + this.items[this.items.length - 1]._id
          );
          itemCont.classList.add("appear");
        }, 20);
      }
    },
    async deleteAllItems() {
      this.showModal = true;
      this.$emit("showModal", this.showModal);
    },
    async clearDoneItems() {
      const filteredDoneItems = this.items.filter((item) => !item.done);
      await ReqService.updateItems(this.activeListId, filteredDoneItems);
      this.fetchItems();
      console.log("clearing done items done");
    },
    burgerClick(menuActive) {
      this.$emit("burgerClick", menuActive);
    },
  },

  watch: {
    activeListId: {
      immediate: true,
      handler: function () {
        this.fetchItems();
      },
      deep: true,
    },
    toDeleteItems: {
      immediate: true,
      handler: async function (newVal) {
        if (newVal === "true") {
          await ReqService.deleteAllItems(this.activeListId);
          this.fetchItems();
          this.$emit("changeToFalse", "false");
          console.log("all items deleted");
        }
        this.showModal = false;
        this.$emit("showModal", this.showModal);
      },
      deep: false,
    },
  },
  updated() {},
};
</script>

<style>
</style>