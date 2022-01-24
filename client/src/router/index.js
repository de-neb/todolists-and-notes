import { createRouter, createWebHistory } from "vue-router";
import TodoList from "../views/TodoList.vue";
import Notes from "../views/Notes.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    children: [
      { path: "/todolist", component: TodoList, name: "To-Do List" },
      {
        path: "/notes",
        component: Notes,
        name: "Notes",
      },
    ],
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
  // {
  //   path: "/todolist",
  //   name: "TodoList",
  //   component: TodoList,
  //   props: true,
  // },
  // {
  //   path: "/notes",
  //   name: "Notes",
  //   component: Notes,
  //   props: true,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
