<template>
  <div class="new-note">
    <div class="title c-height">
      <input
        type="text"
        name="title"
        id=""
        placeholder="Title.."
        v-model="noteTitle"
      />
    </div>

    <div class="details">
      <textarea
        name="details"
        id=""
        cols="30"
        rows="10"
        placeholder="Details..."
        v-model="noteDetails"
      ></textarea>
    </div>
    <div class="btn-save-del c-height note-margin">
      <div class="color-picker">
        <label for="note-bg-color">Background: </label>
        <input
          type="color"
          name="bgColor"
          id="note-bg-color"
          v-model="bgColor"
        />

        <label for="note-txt-color">Text: </label>
        <input
          type="color"
          name="txtColor"
          id="note-txt-color"
          v-model="txtColor"
        />
      </div>
      <div class="modal-btns justify-end">
        <button class="yes" value="true" @click="saveNote">Save</button>
        <button class="no" value="false" @click="exitModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewNote",
  props: {},
  data() {
    return {
      noteTitle: "",
      noteDetails: "",
      bgColor: "#ffe268",
      txtColor: "#000000",
    };
  },
  methods: {
    exitModal() {
      this.$emit("exitModal", false);
    },
    saveNote() {
      this.$emit("saveNote", {
        title: this.noteTitle,
        details: this.noteDetails,
        bgColor: this.bgColor,
        txtColor: this.txtColor,
      });
    },
  },
};
</script>

<style>
.new-note {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 301;
  width: 700px;
  height: 500px;
  background: #edeef7;
  border-radius: 10px;
}

.title,
.details,
.note-margin {
  /* width: 100%; */
  margin: 15px;
}

.c-height {
  height: 10% !important;
}

.justify-end {
  justify-content: end;
  gap: 20px;
}

.justify-end button {
  font-size: 1.1rem !important;
}

.title input,
.details textarea {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  font-size: 1.3rem;
  font-family: "Nunito", sans-serif;
  resize: none;
}
.details {
  height: 68%;
}

.color-picker {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.color-picker label {
  color: rgb(116, 116, 116);
}
/* div.row1,
div.row2 {
  text-align: start;
} */
</style>