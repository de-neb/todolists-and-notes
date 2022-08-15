<template>
  <div class="wrapper">
    <div class="select-body">
      <span class="material-icons sort"> sort </span>
      <div class="select-label">{{ label }}</div>
    </div>
    <div class="select-content">
      <a href="#" @click="label = 'Date'">Date</a>
      <a href="#" @click="label = 'Priority'">Priority</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",
  data() {
    return {
      label: "Sort by",
    };
  },
  watch: {
    label(val) {
      this.$emit("sort-by", val);
    },
  },
};
</script>

<style>
.wrapper {
  position: relative;
  display: inline-block;
}
.select-body {
  min-width: 120px;
  height: 35px;
  background-color: #d7d2f8;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.select-label {
  color: #7868e6;
  width: 100%;
  padding: 5px;
  text-align: start;
}

.sort {
  vertical-align: middle;
  padding-left: 10px;
}
.select-icon {
  width: 25px;
  padding-left: 20px !important;
}
.select-body:hover {
  background-color: #7868e6;
}
.select-body:hover .sort,
.select-body:hover .select-label {
  color: #eee;
}
.wrapper:hover .select-content {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  align-items: flex-start;
  justify-content: center;
}
.select-content {
  display: none;
  width: 115px;
  background-color: #d7d2f8;
  border-radius: 5px;
  position: absolute;
  z-index: 2000;
  top: 100%;
  right: 0;
  /* margin-right: -50px; */
}

.select-content a {
  width: 100%;
  text-decoration: none;
  text-align: start;
  color: #7868e6;
  padding: 0 10px;
  box-sizing: border-box;
}

.select-content a:hover {
  background-color: #7868e6;
  color: #eee;
}
</style>