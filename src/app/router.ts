import { createRouter, createWebHashHistory } from "vue-router";

import EventsListPage from "@/pages/EventsListPage.vue";
import EventsManagementPage from "@/pages/EventsManagementPage.vue";
import EventsManagementStaffPage from "@/pages/EventsManagementStaffPage.vue";
import HomePage from "@/pages/HomePage.vue";

const routes: any[] = [
  { path: "/", component: HomePage },
  { path: "/events", component: EventsListPage },
  { path: "/events-management", component: EventsManagementPage },
  { path: "/events-management/:id", component: EventsManagementStaffPage },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    template: "<h1>Not Found</h1>",
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
