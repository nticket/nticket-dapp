import { Contract } from "near-api-js";
import { defineStore } from "pinia";

import { useNearStore } from "@/entities/nearStore";

// type Event = {
//   token_series_id: TokenSeriesId,
//   metadata: TokenMetadata,
//   creator_id: AccountId,
//   royalty: HashMap<AccountId, u32>,
//   transaction_fee: Option<U128>,
//   price: Option<Balance>,
//   checkin_staff: Vec<AccountId>
// }

type EventsStoreState = {
  contract: null | Contract;
  events: any[];
  ownedEvents: any[]; // TODO: добавить типы
};

export const useEventsStore = defineStore("EventsStore", {
  state(): EventsStoreState {
    return {
      contract: null,
      events: [],
      ownedEvents: [],
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

    async getOwnedEvents() {
      const nearStore = useNearStore();

      await nearStore.getAccount();

      if (nearStore.account) {
        this.ownedEvents = await nearStore.account.viewFunction(
          process.env.VUE_APP_PARAS_WALLET_ADDRESS || "",
          "nft_token_series_for_owner",
          {
            account_id: nearStore.account.accountId,
            from_index: "0",
            limit: 10, // TODO: сделать нормальную пагинацию
          }
        );

        console.log(this.ownedEvents)

        return this.ownedEvents;
      }

      return [];
    },
  },
});
