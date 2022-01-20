import { createRouter, createWebHistory } from "vue-router";
import TodoList from "../views/TodoList.vue";
import Notes from "../views/Notes.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const routes = [
  {
    path: "/",
    components: {
      default: Login,
      notes: Notes,
      todolist: TodoList,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    props: true,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    props: true,
  },
  {
    path: "/todolist",
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
