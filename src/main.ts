import "./app/styles/index.scss";
import "ant-design-vue/dist/antd.css";
import { Layout, Button } from "ant-design-vue";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "@/app/App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(Layout);
app.use(Button);

app.use(pinia);

app.mount("#app");
