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
      { path: "", component: TodoList },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (document.cookie) {
    if (to.path == "/login" || to.path == "/signup") {
      return router.push("/todolist");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
