import "./app/styles/index.scss";
import "ant-design-vue/dist/antd.css";
import { Layout, Button } from "ant-design-vue";
import * as nearAPI from "near-api-js";
import { createApp } from "vue";

import App from "@/app/App.vue";

const { keyStores } = nearAPI;
const createNearInstance = async () => {
  //@ts-ignore
  window.NearInstance = await nearAPI.connect({
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    headers: {},
    // explorerUrl: "https://explorer.testnet.near.org",
  });
};

createNearInstance();

const app = createApp(App);

app.use(Layout);
app.use(Button);

app.mount("#app");
