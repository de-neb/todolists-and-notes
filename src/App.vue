<template>
  <div class="pseudo-cont">
    <SideMenu
      :lists="lists"
      @activeList="passActiveListId"
      @updateLists="updateLists"
    ></SideMenu>
    <MainContent
      v-if="lists"
      :lists="lists"
      :activeListId="activeListId"
      :activeListName="activeListName"
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
    };
  },
  methods: {
    async fetchList() {
      const result = await ReqService.getList();
      const data = await result;

      this.lists = [...data];

      console.log("fetched", this.lists);
    },
    passActiveListId({ id, name }) {
      this.activeListId = id;
      this.activeListName = name;
      console.log("passed");
    },
    async updateLists(newList) {
      await ReqService.createList(newList).then(() => this.fetchList());

      console.log("update lists");
    },
  },
  created() {
    this.fetchList();
  },
};
</script>

<style>
</style>
