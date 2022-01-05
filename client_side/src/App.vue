<template>
  <div class="container">
    <div class="pseudo-cont">
      <SideMenu
        :lists="lists"
        :menuActive="menuActive"
        @activeList="passActiveListId"
        @addList="addList"
        @deleteList="deleteList"
      ></SideMenu>
      <div
        :class="{
          'blur-bg': menuActive && addBlur,
          'z-index-2': menuActive && addBlur,
        }"
      ></div>
      <MainContent
        v-if="lists"
        :lists="lists"
        :activeListId="activeListId"
        :activeListName="activeListName"
        :firstPageLanding="firstPageLanding"
        :toDeleteItems="toDeleteItems"
        @showModal="showConfirmModal"
        @changeToFalse="(bool) => (toDeleteItems = bool)"
        @burgerClick="(bool) => (menuActive = !bool)"
      ></MainContent>

      <!-- <Notes></Notes> -->
    </div>
    <div :class="{ 'blur-bg': showModal }"></div>
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
import MainContent from "./components/MainContent.vue";
import ConfirmModal from "./components/ConfirmModal.vue";
// import Notes from "./components/Notes.vue";

export default {
  name: "App",
  components: {
    SideMenu,
    MainContent,
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
      updateMenuActive: "",
      addBlur: "",
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
      const updatedList = await ReqService.deleteList(id);
      this.lists = await updatedList;

      const listsLen = this.lists.length;

      this.activeListId = this.lists[listsLen - 1]._id;
      this.activeListName = this.lists[listsLen - 1].name;
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
    checkWindowSize(e) {
      if (e.currentTarget.innerWidth >= 800) {
        this.addBlur = false;
      } else if (e.currentTarget.innerWidth < 800) {
        this.addBlur = true;
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

    //add event listener when resizing window
    window.addEventListener("resize", this.checkWindowSize);
  },
  unmounted() {
    window.removeEventListener("resize", this.checkWindowSize);
  },
};
</script>

<style scoped>
.show {
  display: flex !important;
}

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
  z-index: 2;
}
</style>
