<template>
  <div class="modal-confirmation">
    <h2 class="modal-title">
      Delete all items in {{ activeListName.toUpperCase() }}?
    </h2>
    <div class="modal-btns">
      <button class="yes" value="true" @click="confirmDeletion($event)">
        Yes
      </button>
      <button class="no" value="false" @click="confirmDeletion($event)">
        No
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: { activeListName: String },
  data() {
    return {};
  },
  methods: {
    confirmDeletion(e) {
      this.$emit("confirm-deletion", e.target.value);
    },
  },
};
</script>

<style>
h2.modal-title {
  color: #7868e6;
  margin: 0;
  height: 50px;
  line-height: 3rem;
}
.modal-confirmation {
  display: none !important;
  height: 200px;
  width: 400px;
  padding: 10px;
  position: absolute;
  background: #edeef7;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  flex-direction: column;
  font-family: "Nunito", sans-serif;
  z-index: 300;
}
.modal-btns {
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
}

.modal-btns button {
  width: 75px;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 0;
  font-family: "Nunito", sans-serif;
  border: none;
  border-radius: 5px;
  padding: 5px;
  color: #eee;
}

.modal-btns button.yes {
  background-color: #428b46;
}

.modal-btns button.no {
  background-color: #e7305b;
}
</style>