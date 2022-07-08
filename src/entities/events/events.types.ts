export enum ContractMethods {
  GetEvents = 'nft_get_series',
  BuyEvent = 'nft_buy',
}

export type NContract = {
  [ContractMethods.GetEvents]?: (arg: GetEventsArgs) => Promise<NEvent[]>;
  [ContractMethods.BuyEvent]?: (
    arg: BuyEventArgs,
    props: Record<any, any>
  ) => void;
};

export type GetEventsArgs = {
  from_index: string; // потому что там тип /u128 (считай BigInt)
  limit: number; // а тут /u64, а в JS Number - 64 bit
};

export type BuyEventArgs = {
  token_series_id: string | number;
  receiver_id: string;
};

export type EventsStoreState = {
  contract: null | NContract;
  events: NEvent[];
  ownedEvents: NEvent[];
};

export type NEvent = {
  token_series_id: string;
  metadata: {
    title: string;
    description: string;
    media: string;
    media_hash: null | string;
    copies: number;
    issued_at: null | Date | string;
    expires_at: null | Date | string;
    starts_at: null | Date | string;
    updated_at: null | Date | string;
    extra: null | string;
    reference: null | string;
    reference_hash: null | string;
  };
  creator_id: string;
  royalty?: any;
  transaction_fee: null | string;
  price: number;
  checkin_staff: string[];
};
