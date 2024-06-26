export interface MerchantTransactions {
  from_display_name: string;
  transfer_id: string;
  home_transaction_id: string;
  error_message: string;
  payee_fspId: string;
  amount: string;
  currency: string;
  current_state: string;
  initiated_timestamp: string;
  merchant_id: string;
  payer_fspId: string;
  get_parties_response: object;
  get_parties_request: object;
  quote_request: object;
  quote_response: object;
  prepare: object;
  fulfil: object;
}

export interface selectFilters {
  payerFsp?: string | number | undefined
  payeeFsp?: string | number | undefined
}
