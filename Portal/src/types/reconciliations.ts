import { ReconciliationMismatchVariances, ReconciliationMismatchSTATES } from "shared-lib";

export interface Reconciliation {
  id: number

  switch_sending_amount:  number | null
  switch_sending_transactions: number | null
  switch_receiving_amount: number | null
  switch_receiving_transactions: number | null
  dfsp_sending_amount: number | null
  dfsp_sending_transactions: number | null
  dfsp_receiving_amount: number | null
  dfsp_receiving_transactions: number | null
  switch_only_transactions: number | null
  dfsp_only_transactions: number | null
  status: string
  uploaded_at: string | null
  created_at: string
  resolved_at: string | null
  window: {
    id: number
    from: string
    to: string
  };
  dfsp: {
    id: number
    name: string
    email: string
    fspId: string
    dfsp_type: string
    activated: boolean
    logo_uri: string | null
    business_license_id: string
    client_secret: string | null
    merchant_account_registration_callbackUrl: string | null
    merchant_account_modification_callbackUrl: string | null
    merchant_account_closing_callbackUrl: string | null
    merchant_payment_callbackUrl: string | null
    payment_transaction_status_callbackUrl: string | null
    created_at: string
    updated_at: string
  };
}

export interface GetReconciliationParams {
  page: number
  limit?: number
  id?: string | undefined
  search?: string | undefined
  dfspId?: string | number | undefined
  status?: string | number | null
}

export interface GetReconciliationVariancesParams {
  id: string
  variance: string
}

export interface GetReconciliationVariancesFilterParams {
  filter_status?: ReconciliationMismatchSTATES
  search?: string
}

export interface LiquidationSheet {
  dfsp: string
  credit: number
  debit: number
}
export interface exportReconciliationVariancesParmas {
  reconciliationId: string
  mismatch_reason: ReconciliationMismatchVariances

}