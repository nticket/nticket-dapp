import { Contract } from "near-api-js";
import { defineStore } from "pinia";

import { useNearStore } from "@/entities/nearStore";

type EventsStoreState = {
  contract: null | Contract;
  events: any[];
};

export const useEventsStore = defineStore("EventsStore", {
  state(): EventsStoreState {
    return {
      contract: null,
      events: [],
    };
  },
  actions: {
    async getEvents() {
      const nearStore = useNearStore();

      await nearStore.getAccount();

      if (nearStore.account) {
        // по сути костыль
        this.events = await nearStore.account.viewFunction(
          process.env.VUE_APP_PARAS_WALLET_ADDRESS || "",
          "nft_get_series",
          {
            from_index: "0", // потому что там тип /u128 (считай BigInt)
            limit: 5, // а тут /u64, а в JS Number - 64 bit
          }
        );

        return this.events;
      }

      return [];
    },
  },
});
