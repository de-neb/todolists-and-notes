<template>
  <div
    class="container"
    v-if="currentRoute === 'Login' || currentRoute === 'Signup'"
  >
    <router-view @logged-in="getUserInfo"> </router-view>
  </div>
  <div
    class="container"
    v-else-if="currentRoute === 'Notes' || currentRoute === 'TodoList'"
  >
    <SideMenu
      v-bind="sideMenuProps"
      @active-list="passActiveListId"
      @add-list="addList"
      @delete-list="deleteList"
    ></SideMenu>
    <div
      :class="{
        'blur-bg': menuActive,
        'z-index-2': menuActive,
      }"
    ></div>
    <div class="bar-route-container">
      <!-- top bar -->
      <div class="title-cont">
        <div class="menu">
          <input
            type="checkbox"
            class="burger-check"
            v-model="menuActive"
            @click="burgerClicked"
          />
          <div class="burger">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
        <h1 class="title" id="title">
          {{
            lists.length && currentRoute == "TodoList"
              ? activeListName
              : currentRoute
          }}
        </h1>
      </div>
      <!-- top bar -->

      <router-view
        v-if="lists"
        v-bind="todoListProps"
        @show-modal="showConfirmModal"
        @change-to-false="(bool) => (toDeleteItems = bool)"
        @list-len="(len) => (listLenRT = len)"
      ></router-view>
    </div>

    <div :class="{ 'blur-modal-bg': showModal }"></div>
    <ConfirmModal
      :class="{ show: showModal }"
      :activeListName="activeListName"
      @confirmDeletion="confirmDeletion"
    ></ConfirmModal>
  </div>
</template>

<script>
import ReqService from "./ReqService";
import SideMenu from "./components/SideMenu.vue";
import ConfirmModal from "./components/ConfirmModal.vue";
export default {
  name: "App",
  components: {
    SideMenu,
    ConfirmModal,
  },
  data() {
    return {
      lists: [],
      activeListId: "",
      activeListName: "",
      firstPageLanding: false,
      showModal: "",
      toDeleteItems: null,
      menuActive: false,
      noteActive: false,
      listLenRT: 0,
      currentRoute: "",
      userInfo: [],
    };
  },
  methods: {
    async fetchList() {
      const result = await ReqService.getList();
      const data = await result;
      this.lists = [...data];
      return this.lists;
    },
    async passActiveListId({ id, name }) {
      this.activeListId = id;
      this.activeListName = name;
      this.menuActive = !this.menuActive;
      //set active list
      this.lists.forEach((list) => {
        if (list._id === id) {
          list.active = true;
        } else {
          list.active = false;
        }
      });
      //update active list in db when selected
      await ReqService.updateActiveList(id);
    },
    async addList(listName) {
      await ReqService.createList(listName);
      await this.fetchList();
      const listsLen = this.lists.length;
      this.activeListId = this.lists[listsLen - 1]._id;
      this.activeListName = this.lists[listsLen - 1].name;
    },
    async deleteList(id) {
      if (this.lists.length > 1) {
        const prevListId = this.lists[this.lists.length - 2]._id;
        const updatedList = await ReqService.deleteList(id, prevListId);
        this.lists = await updatedList;

        const listsLen = this.lists.length;

        this.activeListId = this.lists[listsLen - 1]._id;
        this.activeListName = this.lists[listsLen - 1].name;
      } else {
        const updatedList = await ReqService.deleteList(id);
        this.lists = await updatedList;
      }
    },
    showConfirmModal(showModal) {
      this.showModal = showModal;
    },
    confirmDeletion(bool) {
      this.toDeleteItems = bool;
      if (bool === "false") {
        this.showModal = false;
      }
    },
    getUserInfo({ username, id }) {
      this.userInfo = [username, id];
    },
  },
  computed: {
    todoListProps() {
      return {
        lists: this.lists,
        activeListId: this.activeListId,
        activeListName: this.activeListName,
        firstPageLanding: this.firstPageLanding,
        toDeleteItems: this.toDeleteItems,
      };
    },
    sideMenuProps() {
      return {
        lists: this.lists,
        menuActive: this.menuActive,
        noteActive: this.noteActive,
        listLenRT: this.listLenRT,
        userInfo: this.userInfo,
      };
    },
  },
  watch: {
    $route(newVal) {
      this.currentRoute = newVal.name;
      // this.menuActive = !this.menuActive;

      if (newVal.name == "Notes") {
        this.menuActive = false;
        this.noteActive = true;
      } else {
        this.noteActive = false;
      }
    },
  },
  created() {
    this.fetchList().then(() => {
      if (this.lists.length === 1) {
        this.activeListId = this.lists[0]._id;
        this.activeListName = this.lists[0].name;
      } else {
        this.lists.forEach((list) => {
          if (list.active) {
            this.activeListId = list._id;
            this.activeListName = list.name;
          }
        });
      }
    });
  },
};
</script>

<style scoped>
.bar-route-container {
  width: inherit;
  position: relative;
}

.show {
  display: flex !important;
}

@media (max-width: 800px) {
  .blur-bg {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
  }

  .z-index-2 {
    z-index: 9;
  }
}
</style>
