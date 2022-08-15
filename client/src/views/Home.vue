<template>
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
        {{ showTitle }}
      </h1>
    </div>
    <!-- top bar -->
    <router-view
      v-if="lists"
      v-bind="todoListProps"
      :uid="uidCopy"
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
</template>

<script>
import ReqService from "../ReqService";
import SideMenu from "../components/SideMenu.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
export default {
  name: "Home",
  components: {
    SideMenu,
    ConfirmModal,
  },
  props: {
    uid: String,
    user: String,
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
      currentRoute: null,
    };
  },
  methods: {
    async fetchList() {
      const result = await ReqService.getList(this.uidCopy);
      this.lists = await result;
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
      await ReqService.updateActiveList(this.uidCopy, id);
    },
    async addList(listName) {
      const result = await ReqService.createList(this.uidCopy, listName);
      this.lists = await result;
      const listsLen = this.lists.length;
      this.activeListId = this.lists[listsLen - 1]._id;
      this.activeListName = this.lists[listsLen - 1].name;
    },
    async deleteList(id) {
      if (this.lists.length > 1) {
        const prevListId = this.lists.length - 2;
        const updatedList = await ReqService.deleteList(
          this.uidCopy,
          id,
          prevListId
        );
        this.lists = await updatedList;
        const listsLen = this.lists.length;
        this.activeListId = this.lists[listsLen - 1]._id;
        this.activeListName = this.lists[listsLen - 1].name;
      } else {
        const updatedList = await ReqService.deleteList(this.uidCopy, id);
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
  },
  computed: {
    uidCopy() {
      if (!this.uid) {
        //get uid saved in cookie created from the client
        const uid = document.cookie
          .split(";")
          .filter((el) => el.includes("uid"))[0];
        if (uid.includes("uid=j%3A%22")) {
          return decodeURIComponent(uid).split(":")[1].replace(/"/g, "");
        } else {
          return uid.split("=")[1];
        }
      } else {
        return this.uid;
      }
    },
    showTitle() {
      if (
        (this.$route.path == "/todolist" && !this.lists.length) ||
        this.$route.path == "/notes"
      )
        return this.$route.name;
      else return this.activeListName;
    },
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
        user: this.user,
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
    if (this.uidCopy) {
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
    }
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
