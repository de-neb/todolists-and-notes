<template>
  <div class="notes" id="notes">
    <div class="create-note">
      <button @click="addNote">
        <span class="material-icons material-icons-outlined"> add </span>
        &nbsp;New Note
      </button>
    </div>

    <!-- new note modal start-->
    <div :class="{ 'blur-modal-bg': showNoteModal }"></div>
    <NewNote
      :title="title"
      :details="details"
      :noteId="noteId"
      :editContent="editContent"
      :editBgColor="editBgColor"
      :editTxtColor="editTxtColor"
      v-if="showNoteModal"
      @saveNote="saveNewNote"
      @updateNote="updateCurrentNote"
      @exitModal="
        (bool) => {
          showNoteModal = bool;
        }
      "
    ></NewNote>
    <!-- new note modal end -->

    <Loader v-if="loading" class="scale"></Loader>
    <div v-else-if="!notes.length && !loading" class="no-todo-item">
      <h2>You don't have any notes added yet :(</h2>
      <h4>Click button above to create one!</h4>
    </div>
    <div v-else class="grid-container">
      <div class="col col-0">
        <div
          class="note-cont"
          v-for="note in group1"
          :style="{ background: note.bgColor, color: note.txtColor }"
          :key="note._id"
          :id="'note-' + note._id"
        >
          <div class="delete-note">
            <span
              class="material-icons md-25 material-icons-outlined delete"
              @click="deleteNote(note._id)"
            >
              push_pin
            </span>
            <span
              class="material-icons edit"
              @click="
                editNote(
                  note._id,
                  note.title,
                  note.details,
                  note.bgColor,
                  note.txtColor
                )
              "
            >
              edit
            </span>
          </div>
          <div class="note-title" v-html="note.title"></div>
          <div class="note-details" v-html="note.details"></div>
        </div>
      </div>
      <div class="col col-1 hide-group2">
        <div
          class="note-cont"
          v-for="note in group2"
          :style="{ background: note.bgColor, color: note.txtColor }"
          :key="note._id"
          :id="'note-' + note._id"
        >
          <div class="delete-note">
            <span
              class="material-icons md-25 material-icons-outlined delete"
              @click="deleteNote(note._id)"
            >
              push_pin
            </span>
            <span
              class="material-icons edit"
              @click="
                editNote(
                  note._id,
                  note.title,
                  note.details,
                  note.bgColor,
                  note.txtColor
                )
              "
            >
              edit
            </span>
          </div>
          <div class="note-title" v-html="note.title"></div>
          <div class="note-details" v-html="note.details"></div>
        </div>
      </div>
      <div class="col col-2">
        <div
          class="note-cont"
          v-for="note in group3"
          :style="{ background: note.bgColor, color: note.txtColor }"
          :key="note._id"
          :id="'note-' + note._id"
        >
          <div class="delete-note">
            <span
              class="material-icons md-25 material-icons-outlined delete"
              @click="deleteNote(note._id)"
            >
              push_pin
            </span>
            <span
              class="material-icons edit"
              @click="
                editNote(
                  note._id,
                  note.title,
                  note.details,
                  note.bgColor,
                  note.txtColor
                )
              "
            >
              edit
            </span>
          </div>
          <div class="note-title" v-html="note.title"></div>
          <div class="note-details" v-html="note.details"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReqService from "../ReqService";
import NewNote from "../components/NewNote.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "Notes",
  components: {
    NewNote,
    Loader,
  },
  data() {
    return {
      notes: [],
      title: "",
      details: "",
      editBgColor: "",
      editTxtColor: "",
      editContent: false,
      noteId: "",
      isVisible: true,
      removeGroup2: false,
      showNoteModal: false,
      loading: false,
      name: "Notes",
    };
  },
  methods: {
    async getNotes() {
      this.loading = true;
      const data = await ReqService.getNotes();
      this.notes = [...(await data)];
      this.loading = false;
      return this.notes;
    },
    async saveNewNote({ title, details, bgColor, txtColor }) {
      await ReqService.createNote(title, details, bgColor, txtColor);

      await this.getNotes().then(() => {
        const newNoteId = this.notes[this.notes.length - 1]._id;
        //add animation

        this.addNoteAnimation(newNoteId);
      });
      this.showNoteModal = false;
    },
    async editNote(id, title, details, bgColor, txtColor) {
      this.showNoteModal = true;
      this.title = title;
      this.details = details;
      this.noteId = id;
      this.editBgColor = bgColor;
      this.editTxtColor = txtColor;
      this.editContent = true;
    },
    async updateCurrentNote({ id, title, details, bgColor, txtColor }) {
      await ReqService.udpateNote(id, title, details, bgColor, txtColor);
      this.getNotes().then(() => {
        this.showNoteModal = false;
      });
    },
    addNote() {
      this.showNoteModal = true;
      this.editContent = false;
    },
    async deleteNote(id) {
      await ReqService.deleteNote(id);
      const note = document.getElementById(`note-${id}`);
      note.classList.add("remove-note");
      setTimeout(() => {
        this.getNotes();
      }, 300);
    },
    addNoteAnimation(id) {
      const newNote = document.getElementById(`note-${id}`);
      newNote.classList.add("show-note");
    },
    getWindowSize(e) {
      if (e.currentTarget.innerWidth <= 1200) {
        this.removeGroup2 = true;
        return true;
      } else {
        this.removeGroup2 = false;
        return false;
      }
    },
    burgerClick(menuActive) {
      this.$emit("burgerClick", menuActive);
    },
  },
  computed: {
    group1: function () {
      if (this.removeGroup2) {
        return this.notes.filter((el, i) => i % 2 === 0);
      } else {
        return this.notes.filter((el, i) => i % 3 === 0);
      }
    },
    group2: function () {
      return this.notes.filter((el, i) => i % 3 === 1);
    },
    group3: function () {
      if (this.removeGroup2) {
        return this.notes.filter((el, i) => i % 2 === 1);
      } else {
        return this.notes.filter((el, i) => i % 3 === 2);
      }
    },
  },

  created() {
    this.getNotes();

    // //when browser is resized
    window.addEventListener("resize", this.getWindowSize);

    //at reload
    if (window.innerWidth <= 1200) {
      this.removeGroup2 = true;
    } else {
      this.removeGroup2 = false;
    }
  },
  unmount() {
    window.removeEventListener("resize", this.getWindowSize);
  },
};
</script>

<style>
span.edit {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

span.edit:hover {
  mix-blend-mode: soft-light;
}

.pos-relative {
  position: relative;
}

@media (max-width: 1200px) {
  .hide-group2 {
    display: none !important;
  }
}
</style>