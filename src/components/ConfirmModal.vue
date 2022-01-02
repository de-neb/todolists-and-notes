<template>
  <div class="modal">
    <h2>Delete all items in {{ activeListName.toUpperCase() }}?</h2>
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
      this.$emit("confirmDeletion", e.target.value);
    },
  },
};
</script>

<style scoped>
h2 {
  color: #7868e6;
}
.modal {
  display: none !important;
  height: 200px;
  width: 400px;
  position: absolute;
  background: #edeef7;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Nunito", sans-serif;
}

button {
  width: 75px;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 20px;
  font-family: "Nunito", sans-serif;
  border: none;
  border-radius: 5px;
  padding: 5px;
  color: #eee;
}

button.yes {
  background-color: #428b46;
}

button.no {
  background-color: #e7305b;
}
</style>