import { utils } from 'near-api-js'
import { defineStore } from 'pinia'
import { useNearStore } from '@/entities/nearStore'
import { ContractMethods, EventsStoreState, NContract, NEvent, } from '@/entities/events/events.types'
import { BigNumber } from "bignumber.js";
import * as tweetnacl from "tweetnacl";
import { parse } from '@typescript-eslint/parser'


const { VUE_APP_CONTRACT_ADDRESS = '' } = process.env;

const storageDeposit = 1e22; // TODO: поправить это значение

export const useEventsStore = defineStore('EventsStore', {
  state(): EventsStoreState {
    return {
      contract: null,
      events: [],
      ownedEvents: [],
      tickets: [],
    };
  },
  actions: {
    async getContract() {
      if (!this.contract) {
        // TODO: положить это в свойства класса
        const nearStore = useNearStore();
        const account = nearStore.getAccount();

        const viewMethods = [
          ContractMethods.GetEvents,
          ContractMethods.GetMyTickets,
        ];
        const changeMethods = [
          ContractMethods.BuyEvent,
          ContractMethods.AddStaff,
          ContractMethods.RemoveStaff,
          ContractMethods.AddPublicKey,
          ContractMethods.CheckIn,
        ];

        const contract: NContract = {};

        viewMethods.forEach((methodName) => {
          contract[methodName] = async (args: any = {}, options: any = {}) =>
            await account.viewFunction(
              VUE_APP_CONTRACT_ADDRESS,
              methodName,
              args,
              options
            );
        });

        changeMethods.forEach((methodName) => {
          contract[methodName] = async (args: any = {}, props: any = {}) =>
            await account.functionCall({
              contractId: VUE_APP_CONTRACT_ADDRESS,
              methodName,
              args,
              gas: props.gas,
              attachedDeposit: props.attachedDeposit,
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
          process.env.VUE_APP_CONTRACT_ADDRESS || '',
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

    async getMyTickets(): Promise<NEvent[] | null> {
      const nearStore = useNearStore();
      const accountId = await nearStore.getAccountId();

      if (accountId === null) {
        return null;
      }

      const contract = await this.getContract();

      const tickets = await contract?.[ContractMethods.GetMyTickets]?.({
        account_id: accountId,
        from_index: '0',
        limit: 10,
      });

      if (tickets?.length) {
        this.tickets = tickets;
        console.log(Array.from(tickets));
      }

      return this.tickets;
    },

    async getOwnedEventById(id: any): Promise<NEvent | null> {
      const nearStore = useNearStore();

      await nearStore.getAccount();

      if (nearStore.account) {
        const event = await nearStore.account.viewFunction(
          process.env.VUE_APP_CONTRACT_ADDRESS || '',
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

    async generateCheckinParams(token_id: any) {
      const nacl = tweetnacl;

      // если пара ключей есть, просто отдаём готовую ссылку в ебало
      const key = await this.getPublicKeyForTicket(token_id);

      const nearStore = useNearStore();
      const accountId = await nearStore.getAccountId();

      const now = Math.floor(Date.now() / 1000);
      const keyPair = JSON.parse(key);
      const message = token_id + ';' + accountId + ';' + now;

      console.log(message);

      const publicKey = this._arrayBufferToBase64(keyPair.publicKey, 32);

      const secret_buffer = new Uint8Array(
        Object.keys(keyPair.secretKey).map(function (key) {
          return keyPair.secretKey[key];
        })
      );

      const signature = this._arrayBufferToBase64(
        nacl.sign(new TextEncoder().encode(message), secret_buffer), 64
      );

      console.log('Public Key: ' + publicKey);
      console.log('Signature: ' + signature);

      return {
        timestamp: now,
        signature: signature,
        account_id: accountId,
        token_id: token_id,
      };
    },

    async getPublicKeyForTicket(token_id: any) {
      const nacl = tweetnacl;

      let key = localStorage.getItem('key');
      console.log(key);

      // TODO: проверить что такой публичный ключ есть в блокчейне

      if (key === null) {
        key = JSON.stringify(nacl.sign.keyPair());
        localStorage.setItem('key', key);

        const keyPair = JSON.parse(key);
        const publicKey = this._arrayBufferToBase64(keyPair.publicKey, 32);

        console.log(publicKey);

        const contract = await this.getContract();

        await contract?.[ContractMethods.AddPublicKey]?.(
          {
            public_key_base64: publicKey,
          },
          {
            gas: 300_000_000_000_000,
            attachedDeposit: 1,
            callbackUrl: window.location.href + '?showCheckinData=' + token_id,
          }
        );
      }

      return key;
    },

    _arrayBufferToBase64(buffer_dict: any, l: any): string {
      let binary = '';
      const buffer = Object.values(buffer_dict).slice(0, l);

      // @ts-ignore
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;

      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      return btoa(binary);
    },

    async markTicketUsed(
      token_id: any,
      signature: any,
      account_id: any,
      timestamp: any
    ) {
      const contract = await this.getContract();

      await contract?.[ContractMethods.CheckIn]?.(
        {
          token_id: token_id,
          signature_base64: signature,
          account_id: account_id,
          timestamp: parseInt(timestamp),
        },
        {
          gas: 300_000_000_000_000,
          attachedDeposit: 1,
          walletCallbackUrl: window.location.href + '?successFull',
        }
      );

      return null;
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

      await contract?.[ContractMethods.BuyEvent]?.(
        {
          token_series_id,
          receiver_id: String(nearStore.getAccountId()),
        },
        {
          gas: 300_000_000_000_000,
          attachedDeposit: new BigNumber(amount)
            .plus(new BigNumber(storageDeposit))
            .toFixed(),
        }
      );
    },
  },
});
