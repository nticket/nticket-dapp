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
