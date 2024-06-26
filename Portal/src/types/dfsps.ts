import { editDfspForm } from "@/lib/validations/onboardDfsp"

export interface dfspInfo {
  no: number // dfsp database id
  dfspId: string // dfsp mojaloop id
  dfspName: string
  businessLicenseId: string
  activated: boolean
  created_at: string
}

export interface DfspResponse {
  id: number // dfsp database id
  name: string
  fspId: string // dfsp mojaloop id
  dfsp_type: string
  joined_date: string
  activated: boolean
  logo_uri: string
  business_license_id: string
  client_secret: string
  created_at: string
  updated_at: string
}


export interface DfspHubAccounts {
    id: number // dfsp database id
    ledgerAccountType: string,
    currency: string,
    isActive: number,
    value: number,
    reservedValue: number,
    changedDate: Date
}

interface LimitObj {
  // for the DfspPositionLimitsObj
  type: string
  value: number
  alarmPercentage: number
}

export interface DfspPositionLimitsObj {
  currency: string
  limit: LimitObj
}

export interface HubDfspInfo {
  name: string,
  fspId: string,
  created_at: string,
  activated: boolean,
  merchant_account_registration_callbackUrl: string,
  merchant_account_modification_callbackUrl: string,
  merchant_account_closing_callbackUrl: string,
  merchant_payment_callbackUrl: string,
  payment_transaction_status_callbackUrl: string,
}

export interface DfspHubFunds {
  transferId: string,
  externalReference: string,
  action: string,
  reason: string,
  amount: {
    amount: string,
    currency: string
  }
}
export interface AddDfspHubFundsPayload {
  mainPayload: DfspHubFunds,
  dfspId: string,
  settlementAccId: number,
}

export interface DisablePositionAccountPayload{
  isActive: boolean
}

export interface editDfspPayload {
  fspId : string
  payload: editDfspForm
}
