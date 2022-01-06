import { createRouter, createWebHistory } from "vue-router";
import TodoList from "../views/TodoList.vue";
import Notes from "../views/Notes.vue";

const routes = [
  {
    path: "/",
    name: "TodoList",
    component: TodoList,
    props: true,
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
