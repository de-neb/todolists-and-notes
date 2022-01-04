<template>
  <div class="title-cont">
    <div class="menu">
      <input
        type="checkbox"
        class="burger-check"
        :id="'menu-list' + activeListId"
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
      {{ listsLen ? activeListName : "TO-DO LIST" }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  props: {
    activeListName: String,
    listsLen: Number,
  },
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    burgerClicked() {
      console.log("clicked");
      this.$emit("burgerClick", this.menuActive);
    },
  },
};
</script>

<style>
</style>