import './app/styles/index.scss';
import 'ant-design-vue/dist/antd.css';
import { Buffer } from 'buffer';

import { Layout, Button, Card, Tag, Modal, Badge, Menu } from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { App, router } from '@/app';

globalThis.Buffer = Buffer;

const app = createApp(App);
const pinia = createPinia();

app.use(Layout);
app.use(Button);
app.use(Card);
app.use(Tag);
app.use(Modal);
app.use(Badge);
app.use(Menu);

app.use(pinia);
app.use(router);

app.mount('#app');
