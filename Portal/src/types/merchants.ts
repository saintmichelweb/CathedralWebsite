import type { FileUploadModuleName, MerchantRegistrationStatus, MerchantType } from 'shared-lib'

import type { CreatedBy } from './merchantDetails'

export interface MerchantInfo {
  no: number
  dbaName: string
  registeredName: string
  payintoAccountId: string
  merchantType: MerchantType
  town: string
  countrySubdivision: string
  counterDescription: string
  registeredDfspName: string
  registrationStatus: MerchantRegistrationStatus
  maker: CreatedBy
}

export interface ErrorMessageInfo {
  message: string
}

export interface ErrorBatchFileInfo {
  status:number, message?: ErrorMessageInfo, merchant_code?:string, lineNumber: number
}

export interface BatchFileRes {
  data: number, message?: ErrorMessageInfo, merchant_code?:string, lineNumber: number
}


export interface MerchantBatchFileInfo {
  file_name: string
  status: string 
  succeeded_registrations: number
  failed_registrations: number
  created_at: string
  errors_logs?: ErrorBatchFileInfo[]
}

export interface searchParams {
  search?: string | null
  page: number
}

export interface fileUploadRequest {
  module: FileUploadModuleName
  file: File | null
  windowId?: number | string | undefined
}

export interface merchantSelectFilters {
  addedBy?: string | number | undefined
  approvedBy?: string | number | undefined
}

