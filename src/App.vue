<template>
  <div class="pseudo-cont">
    <SideMenu :lists="lists" @activeList="passActiveListId"></SideMenu>
    <MainContent
      v-if="lists"
      :lists="lists"
      :activeListId="activeListId"
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
      activeListId: null,
    };
  },
  methods: {
    passActiveListId(id) {
      this.activeListId = id;
      console.log("passed");
    },
  },
  async created() {
    const result = await ReqService.getList();
    const data = await result;

    this.lists = [...data];

    console.log(this.lists);
  },
};
</script>

<style>
</style>
