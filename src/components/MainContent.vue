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
        {{ lists.length ? title : "TO-DO LIST" }}
      </h1>
    </div>

       
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
          <button class="expand" @click="expandItem(todoItem.title)">
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
            <button class="del" @click="deleteTodoItem(todoItem.title)">
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
            addTodoItem();
            appearItem();
          "
          >add</span
        >
        <input
          type="text"
          name="todo-item"
          :id="'todo-' + lists[taskListId]"
          maxlength="55"
          v-model="itemName"
          @keydown.enter="
            addTodoItem();
            appearItem();
          "
          placeholder="Type your 'to-do' here"
        />
      </div>
    </div>

    <div class="clear" v-if="todoTitles.length">
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
  },
  data() {
    return {
      menuActive: false,
      items: null,
    };
  },
  async beforeUpdate() {
    //check if prop list is loaded
    // console.log("temp", this.lists);
    const result = await ReqService.getItems(this.activeListId);
    const data = await result;
    this.items = data.items;
  },
  async created() {
    // const result = await ReqService.getItems(this.activeListId);
    // const data = await result;
    // this.items = data;
    // console.log("items", data);
  },
};
</script>

<style>
</style>