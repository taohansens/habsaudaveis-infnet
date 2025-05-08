import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import HabitDetails from "@/views/HabitDetails.vue";
import Settings from "@/views/Settings.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/habit/:id", name: "HabitDetails", component: HabitDetails },
  { path: "/settings", name: "Settings", component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
