<template>
  <div class="pseudo-cont">
    <SideMenu
      :lists="lists"
      @activeList="passActiveListId"
      @addList="addList"
      @deleteList="deleteList"
    ></SideMenu>
    <MainContent
      v-if="lists"
      :lists="lists"
      :activeListId="activeListId"
      :activeListName="activeListName"
      :firstPageLanding="firstPageLanding"
    ></MainContent>
  </div>
</template>

<script>
import ReqService from "./ReqService";
import SideMenu from "./components/SideMenu.vue";
import MainContent from "./components/MainContent.vue";

export default {
  name: "App",
  components: {
    SideMenu,
    MainContent,
  },
  data() {
    return {
      lists: [],
      activeListId: "",
      activeListName: "",
      firstPageLanding: false,
    };
  },
  methods: {
    async fetchList() {
      const result = await ReqService.getList();
      const data = await result;

      this.lists = [...data];
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
      this.fetchList().then(() => {
        const listsLen = this.lists.length;
        this.activeListId = this.lists[listsLen - 1]._id;
        this.activeListName = this.lists[listsLen - 1].name;
      });

      console.log("list:", this.lists);
    },
    async deleteList(id) {
      await ReqService.deleteList(id);
      this.fetchList().then(() => {
        const listsLen = this.lists.length;
        this.activeListId = this.lists[listsLen - 1]._id;
        this.activeListName = this.lists[listsLen - 1].name;
      });
      console.log("deleted");
    },
  },
  created() {
    this.fetchList().then(() => {
      // this.firstPageLanding = true;
      if (this.lists.length === 1) {
        this.activeListId = this.lists[0]._id;
        this.activeListName = this.lists[0].name;
      } else {
        console.log("else trigerred from app.vue");
        const activeList = this.lists.filter((el) => el.active);
        console.log("active list", activeList);
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

<style>
</style>
