<template>
  <div class="main" :id="'#list' + taskListId">
    <div class="title-cont">
      <div class="menu">
        <input
          type="checkbox"
          class="burger-check"
          :id="'menu-list' + taskListId"
          v-model="menuActive"
        />
        <div class="burger">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <h1 class="title" id="title">
        {{ lists.length ? activeListName : "TO-DO LIST" }}
      </h1>
    </div>

    <div class="todos-cont">
      <div
        v-for="todoItem in items"
        :key="todoItem"
        class="item-cont"
        :id="'item-cont-' + todoItem.title"
      >
        <div class="top" :id="'todo-' + todoItem.title">
          <div class="priority-flag" :class="todoItem.priority"></div>
          <label :for="'check-' + todoItem.title"></label>
          <input
            type="checkbox"
            :id="'check-' + todoItem.title"
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
            <button class="save" @click="updateItems()">
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
        <span
          class="material-icons material-icons-outlined"
          @click="
            addItem();
            appearItem();
          "
          >add</span
        >
        <input
          type="text"
          name="itemTitle"
          :id="'todo-' + lists[taskListId]"
          maxlength="55"
          v-model="itemTitle"
          @keydown.enter="
            addItem();
            appearItem();
          "
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

export default {
  name: "MainContent",
  props: {
    lists: Array,
    activeListId: String,
    activeListName: String,
  },
  data() {
    return {
      menuActive: false,
      items: [],
      itemTitle: "",
      expandChecker: false,
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
      this.fetchItems();
      this.itemTitle = "";
    },
    async deleteItem(itemId, title) {
      this.animationDelete(title);
      await ReqService.deleteItem(this.activeListId, itemId);
      this.fetchItems();
    },
    async updateItems() {
      await ReqService.updateItems(this.activeListId, this.items);
      this.fetchItems();
      console.log("result", this.items);
    },
    animationDelete(title) {
      const itemBar = document.getElementById("todo-" + title);
      const itemDet = document.getElementById("expanded-cont-" + title);
      const itemCont = document.getElementById("item-cont-" + title);
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
    appearItem() {},
  },

  watch: {
    activeListId: {
      immediate: true,
      handler: function (newVal, oldVal) {
        console.log("lists updated: ", newVal, "| was", oldVal);
        this.fetchItems();
      },
      deep: true,
    },
    // items: {
    //   immediate: true,
    //   handler: function (newVal, oldVal) {
    //     const itemsJson = JSON.stringify(newVal);
    //     if (JSON.stringify(oldVal) !== itemsJson) {
    //       this.fetchItems();
    //       console.log("check", JSON.stringify(oldVal) === itemsJson);
    //     } else {
    //       alert("yo");
    //       this.updateItems(this.activeListId, this.items);
    //       console.log(this.items);
    //     }
    //   },
    //   deep: true,
    // },
  },
  updated() {},
};
</script>

<style>
</style>