<template>
  <div class="main">
    <div class="sort-container">
      <div class="sort-col">
        <span class="material-icons sort"> sort </span>
        <select name="sort" id="sort-by" v-model="sortBy" required>
          <option value="" disabled selected hidden>Sort by</option>
          <option value="Priority">Priority</option>
          <option value="Date">Date</option>
        </select>
      </div>
      <div class="sort-col">
        <input type="checkbox" name="order" id="order" v-model="toDescend" />
        <span class="material-icons arrow"> north </span>
      </div>
    </div>

    <div class="todos-cont" v-if="lists.length && !loading">
      <div
        v-for="todoItem in items"
        :key="todoItem"
        class="item-cont"
        :id="'item-cont-' + todoItem._id"
      >
        <div class="top" :id="'todo-' + todoItem._id">
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
          :id="'expanded-cont-' + todoItem._id"
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
                required
              >
                <option value="None" disabled selected hidden>
                  Set Priority...
                </option>
                <option value="Low">Low</option>
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

    <div class="add-item-cont" v-if="lists.length && !loading">
      <div class="add-item">
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
    <div class="clear" v-if="lists.length && !loading">
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

    <Loader v-if="loading"></Loader>
    <div v-else-if="!lists.length && !loading" class="no-task-item">
      <h2>You don't have any list added to your task list! :(</h2>
      <h4 class="sub-text">Enter a list name on the side to create one!</h4>
    </div>
    <div v-else-if="items && !items.length && !loading" class="no-todo-item">
      <h2>This task list seems to be empty :(</h2>
      <h4 class="sub-text">To add an item, type a to-do then hit enter!</h4>
    </div>
  </div>
</template>

<script>
import ReqService from "../ReqService";
import Loader from "../components/Loader.vue";
export default {
  name: "TodoList",
  props: {
    lists: Array,
    activeListId: String,
    activeListName: String,
    toDeleteItems: Boolean,
  },
  components: {
    Loader,
  },
  data() {
    return {
      menuActive: false,
      items: [],
      itemTitle: "",
      expandChecker: false,
      showModal: false,
      name: "To-do List",
      loading: false,
      fetchedItems: false,
      sortBy: "",
      toDescend: false,
      wasSorted: false,
    };
  },
  methods: {
    async fetchItems() {
      const result = await ReqService.getItems(this.activeListId);
      this.loading = false;
      this.items = await result.items;
    },

    async addItem() {
      await ReqService.addItem(this.activeListId, this.itemTitle);
      //animation wont play if not inside .then
      this.fetchItems().then(() => this.appearItem());
      this.itemTitle = "";
    },
    async deleteItem(itemId) {
      await ReqService.deleteItem(this.activeListId, itemId);
      this.animationDelete(itemId);
      setTimeout(() => {
        this.fetchItems();
      }, 700);
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
    animationDelete(itemId) {
      const itemBar = document.getElementById("todo-" + itemId);
      const itemDet = document.getElementById("expanded-cont-" + itemId);
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
    deleteAllItems() {
      this.showModal = true;
      this.$emit("showModal", this.showModal);
    },
    async clearDoneItems() {
      const filteredDoneItems = this.items.filter((item) => !item.done);
      await ReqService.updateItems(this.activeListId, filteredDoneItems);
      this.loading = true;
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
        this.loading = true;
        this.fetchItems();
      },
      deep: true,
    },
    toDeleteItems: {
      immediate: true,
      handler: async function (newVal) {
        if (newVal === "true") {
          await ReqService.deleteAllItems(this.activeListId);
          this.loading = true;
          this.fetchItems();
          this.$emit("changeToFalse", "false");
          console.log("all items deleted");
        }
        this.showModal = false;
        this.$emit("showModal", this.showModal);
      },
      deep: false,
    },
    "items.length": {
      immediate: true,
      handler: function (newVal) {
        this.$emit("listLen", newVal);
      },
      deep: true,
    },
    sortBy: {
      immediate: true,
      handler: function (newVal) {
        switch (newVal) {
          case "Date":
            this.items.sort((a, b) => {
              if (this.toDescend) {
                return b.date.localeCompare(a.date);
              } else {
                return a.date.localeCompare(b.date);
              }
            });
            break;

          case "Priority":
            this.items.sort((a, b) => {
              const val = { None: -1, Low: 1, Medium: 2, High: 3 };
              if (this.toDescend) {
                return val[b.priority] - val[a.priority];
              } else {
                return val[a.priority] - val[b.priority];
              }
            });
            break;
          default:
            this.wasSorted = true;
            break;
        }
      },
    },
    toDescend: {
      immediate: true,
      handler: function (bool) {
        if (bool && this.wasSorted) {
          this.items = this.items.reverse();
        } else if (!bool && this.wasSorted) {
          this.items = this.items.reverse();
        }
        console.log("toDescend", bool);
      },
    },
  },
};
</script>

<style>
</style>