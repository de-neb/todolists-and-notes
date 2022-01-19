<template>
  <div class="new-note">
    <div class="title c-height">
      <input
        type="text"
        name="title"
        v-if="editContent"
        placeholder="Title.."
        :value="title"
        ref="title"
      />
      <input
        type="text"
        name="title"
        v-else
        placeholder="Title.."
        v-model="newTitle"
      />
    </div>

    <div class="details">
      <textarea
        name="details"
        cols="30"
        rows="10"
        placeholder="Details..."
        v-if="editContent"
        :value="details"
        ref="details"
      ></textarea>
      <textarea
        name="details"
        cols="30"
        rows="10"
        placeholder="Details..."
        v-else
        v-model="newDetails"
      ></textarea>
    </div>
    <div class="btn-save-del c-height note-margin">
      <div class="color-picker">
        <label for="note-bg-color">Background: </label>
        <input
          type="color"
          name="bgColor"
          v-if="editContent"
          id="note-bg-color"
          :value="editBgColor"
          ref="bgColor"
        />
        <input
          type="color"
          name="bgColor"
          v-else
          id="note-bg-color"
          v-model="bgColor"
        />

        <label for="note-txt-color">Text: </label>
        <input
          type="color"
          name="txtColor"
          id="note-txt-color"
          v-if="editContent"
          :value="editTxtColor"
          ref="txtColor"
        />
        <input
          type="color"
          name="txtColor"
          id="note-txt-color"
          v-else
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
  props: {
    title: String,
    details: String,
    noteId: String,
    editContent: Boolean,
    editBgColor: String,
    editTxtColor: String,
  },
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
      this.$emit("exit-modal", false);
    },
    saveNote() {
      if (this.editContent) {
        this.$emit("update-note", {
          id: this.noteId,
          title: this.$refs.title.value,
          details: this.$refs.details.value,
          bgColor: this.$refs.bgColor.value,
          txtColor: this.$refs.txtColor.value,
        });
      } else {
        this.$emit("save-note", {
          title: this.newTitle,
          details: this.newDetails,
          bgColor: this.bgColor,
          txtColor: this.txtColor,
        });
      }
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
  gap: 3%;
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
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.color-picker label {
  color: rgb(116, 116, 116);
}

@media only screen and (max-width: 800px) {
  .new-note {
    width: 95%;
    height: 55vh;
  }
}
</style>