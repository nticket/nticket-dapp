export enum ContractMethods {
  GetEvents = 'nft_get_series',
  BuyEvent = 'nft_buy',
  AddStaff = 'add_checkin_staff',
  RemoveStaff = 'remove_checkin_staff',
  GetMyTickets = 'nft_tokens_for_owner',
  CheckIn = 'check_in',
  AddPublicKey = 'add_public_key',
}

export type NContract = {
  [ContractMethods.GetEvents]?: (arg: GetEventsArgs) => Promise<NEvent[]>;
  [ContractMethods.GetMyTickets]?: (arg: GetMyTicketsArgs) => Promise<NEvent[]>;
  [ContractMethods.BuyEvent]?: (
    arg: BuyEventArgs,
    props: Record<any, any>
  ) => void;
  [ContractMethods.AddStaff]?: (
    arg: AddStaffArgs,
    props: Record<any, any>
  ) => void;
  [ContractMethods.RemoveStaff]?: (
    arg: RemoveStaffArgs,
    props: Record<any, any>
  ) => void;
  [ContractMethods.CheckIn]?: (
    arg: CheckInArgs,
    props: Record<any, any>
  ) => void;
  [ContractMethods.AddPublicKey]?: (
    arg: AddPublicKeyArgs,
    props: Record<any, any>
  ) => void;
};

export type GetEventsArgs = {
  from_index: string; // потому что там тип /u128 (считай BigInt)
  limit: number; // а тут /u64, а в JS Number - 64 bit
};

export type GetMyTicketsArgs = {
  account_id: string;
  from_index: string; // потому что там тип /u128 (считай BigInt)
  limit: number; // а тут /u64, а в JS Number - 64 bit
};

export type BuyEventArgs = {
  token_series_id: string | number;
  receiver_id: string;
};

export type AddStaffArgs = {
  token_series_id: string | number;
  account_id: string;
};

export type RemoveStaffArgs = {
  token_series_id: string | number;
  account_id: string;
};

export type CheckInArgs = {
  token_id: string | number;
  signature_base64: string;
  account_id: string;
  timestamp: number;
};

export type AddPublicKeyArgs = {
  public_key_base64: string;
};

export type EventsStoreState = {
  contract: null | NContract;
  events: NEvent[];
  ownedEvents: NEvent[];
  tickets: NTicket[];
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

export type NTicket = {
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
