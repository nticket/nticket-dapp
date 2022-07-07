import * as nearAPI from "near-api-js";
import { Near, WalletConnection } from "near-api-js";
import { defineStore } from "pinia";

const { keyStores } = nearAPI;

export type NearStoreState = {
  inited: boolean;
  instance: null | Near;
  wallet: null | WalletConnection;
  isSignedIn: boolean;
  accountId: null | string;
};

export const useNearStore = defineStore("NearStore", {
  state(): NearStoreState {
    return {
      inited: false,
      instance: null,
      wallet: null,
      isSignedIn: false,
      accountId: null,
    };
  },
  actions: {
    async init() {
      this.instance = await nearAPI.connect({
        networkId: "testnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        headers: {},
        // explorerUrl: "https://explorer.testnet.near.org",
      });
      this.wallet = new WalletConnection(this.instance, "nticket");
      this.inited = true;
      this.isSignedIn = this.wallet.isSignedIn();
    },

    signIn() {
      if (this.wallet && !this.wallet.isSignedIn()) {
        this.wallet.requestSignIn();
        this.getAccountId();
      }
    },

    signOut() {
      if (this.wallet && this.wallet.isSignedIn()) {
        this.wallet.signOut();
        this.isSignedIn = false;
        this.accountId = null;
      }
    },

    getAccountId() {
      if (this.wallet && !this.wallet.isSignedIn()) {
        const id = this.wallet.getAccountId();

        this.accountId = id;

        return id;
      }

      return null;
    },
  },
});
