import { Contract, utils } from 'near-api-js'
import { defineStore } from 'pinia'
import { toRaw } from 'vue'

import { useNearStore } from '@/entities/nearStore'
import { NEvent } from '@/pages/EventsList/events.types'
import { parse } from '@typescript-eslint/parser'

type EventsStoreState = {
  contract: null | Contract;
  events: NEvent[];
  ownedEvents: any[];
};

const { VUE_APP_PARAS_WALLET_ADDRESS = '' } = process.env;

export const useEventsStore = defineStore('EventsStore', {
  state(): EventsStoreState {
    return {
      contract: null,
      events: [],
      ownedEvents: [],
    };
  },
  actions: {
    async getContract() {
      if (!this.contract) {
        const nearStore = useNearStore();
        const account = nearStore.getAccount();

        this.contract = new Contract(account, VUE_APP_PARAS_WALLET_ADDRESS, {
          viewMethods: [],
          changeMethods: [],
          // @ts-ignore
          sender: account,
        });
      }

      return this.contract;
    },
    async getEvents(): Promise<NEvent[]> {
      const nearStore = useNearStore();
      const account = nearStore.getAccount();

      if (account) {
        // по сути костыль
        this.events = await account.viewFunction(
          VUE_APP_PARAS_WALLET_ADDRESS,
          'nft_get_series',
          {
            from_index: '0', // потому что там тип /u128 (считай BigInt)
            limit: 5, // а тут /u64, а в JS Number - 64 bit
          }
        );

        console.log('events', toRaw(this.events));

        return this.events;
      }

      return [];
    },

    async getOwnedEvents() {
      const nearStore = useNearStore();

      await nearStore.getAccount();

      if (nearStore.account) {
        this.ownedEvents = await nearStore.account.viewFunction(
          process.env.VUE_APP_PARAS_WALLET_ADDRESS || '',
          'nft_token_series_for_owner',
          {
            account_id: nearStore.account.accountId,
            from_index: '0',
            limit: 10, // TODO: сделать нормальную пагинацию
          }
        );

        return this.ownedEvents;
      }

      return [];
    },

    async getOwnedEventById(id: any) {
      const nearStore = useNearStore();

      await nearStore.getAccount();

      if (nearStore.account) {
        const event = await nearStore.account.viewFunction(
          process.env.VUE_APP_PARAS_WALLET_ADDRESS || '',
          'nft_get_series_single',
          {
            token_series_id: id,
          }
        );

        console.log(event)

        return event;
      }

      return [];
    },

    _yoctoNearToNear(yoctoAmount: string | number) {
      try {
        return utils.format.formatNearAmount(String(yoctoAmount));
      } catch (e) {
        return 0;
      }
    },

    async buyEvent(token_series_id: string | number) {
      const nearStore = useNearStore();
      const account = nearStore.getAccount();

      if (account) {
        return await account?.changeFunction?.(
          VUE_APP_PARAS_WALLET_ADDRESS,
          'nft_buy',
          { token_series_id, receiver_id: nearStore.getAccountId() }
        );
      }
    },
  },
});
