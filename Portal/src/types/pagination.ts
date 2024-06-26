export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginationParamsWithDfsp {
  page: number
  limit: number
  dfspId: string | undefined
}

export interface AllData {
  all: boolean
}
