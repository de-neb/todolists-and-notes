<template>
  <div class="notes" id="notes">
    <!-- menu -->
    <TopBar :routeName="name" @burgerClick="burgerClick"></TopBar>
    <!-- menu -->

    <div class="create-note">
      <button @click="addNote">
        <span class="material-icons material-icons-outlined"> add </span>
        &nbsp;New Note
      </button>
    </div>
    <div class="main-container">
      <div v-if="!notes.length" class="no-todo-item">
        <h2>You don't have any notes added yet :(</h2>
        <h4>Click button above to create one!</h4>
      </div>
      <div v-else class="grid-container">
        <div class="col col-0">
          <div
            class="note-cont"
            v-for="note in group1"
            :key="note._id"
            :id="'note-' + note._id"
          >
            <div class="delete-note">
              <span
                class="material-icons md-25 material-icons-outlined"
                @click="deleteNote(note._id)"
              >
                push_pin
              </span>
            </div>
            <div
              class="note-title"
              v-html="note.title"
              contenteditable="true"
              @focusout="handleInput($event, note.notesIndex, 0, 'title')"
            ></div>
            <div
              class="note-details"
              v-html="note.details"
              contenteditable="true"
              @focusout="handleInput($event, note.notesIndex, 0, 'details')"
            ></div>
          </div>
        </div>
        <div class="col col-1" :class="{ hidden: removeGroup2 }">
          <div
            class="note-cont"
            v-for="note in group2"
            :key="note._id"
            :id="'note-' + note._id"
          >
            <div class="delete-note">
              <span
                class="material-icons md-25 material-icons-outlined"
                @click="deleteNote(note._id)"
              >
                push_pin
              </span>
            </div>
            <div
              class="note-title"
              contenteditable="true"
              v-html="note.title"
              @focusout="handleInput($event, note.notesIndex, 1, 'title')"
            ></div>
            <div
              class="note-details"
              contenteditable="true"
              v-html="note.details"
              @focusout="handleInput($event, note.notesIndex, 1, 'details')"
            ></div>
          </div>
        </div>
        <div class="col col-2">
          <div
            class="note-cont"
            v-for="note in group3"
            :key="note._id"
            :id="'note-' + note._id"
          >
            <div class="delete-note">
              <span
                class="material-icons md-25 material-icons-outlined"
                @click="deleteNote(note._id)"
              >
                push_pin
              </span>
            </div>
            <div
              class="note-title"
              contenteditable="true"
              v-html="note.title"
              @focusout="handleInput($event, note.notesIndex, 2, 'title')"
            ></div>
            <div
              class="note-details"
              contenteditable="true"
              v-html="note.details"
              @focusout="handleInput($event, note.notesIndex, 2, 'details')"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReqService from "../ReqService";
import TopBar from "../components/TopBar.vue";
export default {
  name: "Notes",
  components: {
    TopBar,
  },
  data() {
    return {
      notes: [],
      title: "",
      details: "",
      isVisible: true,
      removeGroup2: false,
      name: "Notes",
    };
  },
  methods: {
    async getNotes() {
      const data = await ReqService.getNotes();
      this.notes = [...data];
      return this.notes;
    },
    async addNote() {
      await ReqService.createNote(this.title);
      this.getNotes().then(() => {
        this.addNoteAnimation(this.notes[this.notes.length - 1]._id);
      });
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
      } else {
        this.removeGroup2 = false;
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

    //when browser is resized
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
</style>