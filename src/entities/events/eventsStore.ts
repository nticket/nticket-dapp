import { utils } from 'near-api-js'
import { defineStore } from 'pinia'

import { useNearStore } from '@/entities/nearStore'

import { ContractMethods, EventsStoreState, NContract, NEvent, } from '@/entities/events/events.types'

import { BigNumber } from "bignumber.js";

const { VUE_APP_PARAS_WALLET_ADDRESS = '' } = process.env;

const storageDeposit = 1e22; // TODO: поправить это значение

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

        const viewMethods = [ContractMethods.GetEvents];
        const changeMethods = [
          ContractMethods.BuyEvent,
          ContractMethods.AddStaff,
          ContractMethods.RemoveStaff,
        ];

        const contract: NContract = {};

        viewMethods.forEach((methodName) => {
          contract[methodName] = async (args: any = {}, options: any = {}) =>
            await account.viewFunction(
              VUE_APP_PARAS_WALLET_ADDRESS,
              methodName,
              args,
              options
            );
        });

        changeMethods.forEach((methodName) => {
          contract[methodName] = async (args: any = {}, props: any = {}) =>
            await account.functionCall({
              contractId: VUE_APP_PARAS_WALLET_ADDRESS,
              methodName,
              args,
              gas: props.gas,
              attachedDeposit: props.amount,
              // walletMeta: props.meta,
              walletCallbackUrl: props.callbackUrl || window.location.href,
            });
        });

        this.contract = contract;
      }

      return this.contract;
    },
    async getEvents(): Promise<NEvent[]> {
      const contract = await this.getContract();

      const events = await contract?.[ContractMethods.GetEvents]?.({
        from_index: '0', // потому что там тип /u128 (считай BigInt)
        limit: 5, // а тут /u64, а в JS Number - 64 bit
      });

      if (events?.length) {
        this.events = events;
        console.log(Array.from(events));
      }

      return this.events;
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

    async getOwnedEventById(id: any): Promise<NEvent | null> {
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

        console.log(event);

        return event;
      }

      return null;
    },

    async removeStaff(
      event_id: any,
      staff_user_id: any
    ): Promise<NEvent | null> {
      const contract = await this.getContract();

      await contract?.[ContractMethods.RemoveStaff]?.(
        {
          token_series_id: event_id,
          account_id: staff_user_id,
        },
        {
          gas: 300_000_000_000_000,
          attachedDeposit: 1,
          walletCallbackUrl: window.location.href,
        }
      );

      return null;
    },

    async addStaff(event_id: any, staff_user_id: any): Promise<NEvent | null> {
      const contract = await this.getContract();

      await contract?.[ContractMethods.AddStaff]?.(
        {
          token_series_id: event_id,
          account_id: staff_user_id,
        },
        {
          gas: 300_000_000_000_000,
          attachedDeposit: 1,
          walletCallbackUrl: window.location.href,
        }
      );

      return null;
    },

    async getMyTickets(): Promise<NEvent[] | null> {
      const nearStore = useNearStore();
      const contract = await this.getContract();
      const accountId = nearStore.getAccountId();

      if (accountId === null) {
        return null;
      }

      const events = await contract?.[ContractMethods.GetMyTickets]?.({
        account_id: accountId,
        from_index: '0', // потому что там тип /u128 (считай BigInt)
        limit: 5, // а тут /u64, а в JS Number - 64 bit
      });

      if (events?.length) {
        this.events = events;
        console.log(Array.from(events));
      }

      return this.events;
    },

    _yoctoNearToNear(yoctoAmount: string | number) {
      try {
        return utils.format.formatNearAmount(String(yoctoAmount));
      } catch (e) {
        return 0;
      }
    },

    async buyTicket(token_series_id: string | number, amount: number | string) {
      const nearStore = useNearStore();
      const contract = await this.getContract();

      console.log(amount);
      console.log(storageDeposit);

      await contract?.[ContractMethods.BuyEvent]?.(
        {
          token_series_id,
          receiver_id: String(nearStore.getAccountId()),
        },
        {
          gas: 300_000_000_000_000,
          amount: new BigNumber(amount)
            .plus(new BigNumber(storageDeposit))
            .toFixed(),
        }
      );
    },
  },
});
