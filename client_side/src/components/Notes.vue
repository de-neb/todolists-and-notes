<template>
  <div class="notes hidden" id="notes">
    <div class="title-cont">
      <div class="menu">
        <input
          type="checkbox"
          class="burger-check"
          id="menu-notes"
          v-model="menuActive"
        />
        <div class="burger">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <h1 class="note-main-title">NOTES</h1>
    </div>
    <!-- <hr /> -->
    <div class="create-note">
      <button @click="addNote">
        <span class="material-icons material-icons-outlined"> create </span>
        &nbsp;Create note
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
            v-for="note0 in notes0"
            :key="note0"
            :id="'group0-note' + note0.notesIndex"
            :class="{ visibility: note0.hidden }"
          >
            <div class="delete-note">
              <span
                class="material-icons md-25 material-icons-outlined"
                @click="deleteNote(note0.notesIndex, 0)"
              >
                push_pin
              </span>
            </div>
            <div
              class="note-title"
              v-html="note0.title"
              contenteditable="true"
              @focusout="handleInput($event, note0.notesIndex, 0, 'title')"
            ></div>
            <div
              class="note-details"
              v-html="note0.details"
              contenteditable="true"
              @focusout="handleInput($event, note0.notesIndex, 0, 'details')"
            ></div>
          </div>
        </div>
        <div class="col col-1">
          <div
            class="note-cont"
            v-for="note1 in notes1"
            :key="note1"
            :id="'group1-note' + note1.notesIndex"
          >
            <div class="delete-note">
              <span
                class="material-icons md-25 material-icons-outlined"
                @click="deleteNote(note1.notesIndex, 1)"
              >
                push_pin
              </span>
            </div>
            <div
              class="note-title"
              contenteditable="true"
              v-html="note1.title"
              @focusout="handleInput($event, note1.notesIndex, 1, 'title')"
            ></div>
            <div
              class="note-details"
              contenteditable="true"
              v-html="note1.details"
              @focusout="handleInput($event, note1.notesIndex, 1, 'details')"
            ></div>
          </div>
        </div>
        <div class="col col-2">
          <div
            class="note-cont"
            v-for="note2 in notes2"
            :key="note2"
            :id="'group2-note' + note2.notesIndex"
          >
            <div class="delete-note">
              <span
                class="material-icons md-25 material-icons-outlined"
                @click="deleteNote(note2.notesIndex, 2)"
              >
                push_pin
              </span>
            </div>
            <div
              class="note-title"
              contenteditable="true"
              v-html="note2.title"
              @focusout="handleInput($event, note2.notesIndex, 2, 'title')"
            ></div>
            <div
              class="note-details"
              contenteditable="true"
              v-html="note2.details"
              @focusout="handleInput($event, note2.notesIndex, 2, 'details')"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notes",
  data() {
    return {};
  },
};
</script>

<style>
</style>