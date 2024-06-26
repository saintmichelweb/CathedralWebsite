export interface ServerCurrency {
    id: number
    ledgerAccountType: string
    currency: string
    isActive: number
}

export interface ServerCurrencyAccounts {
    accounts: ServerCurrency[]
}

export interface EndPoint {
    value: string,
    endpointType: string
}

export interface ServerOracle {
    oracleId?: number,
    oracleIdType?: string,
    endpoint: EndPoint,
    currency?: string,
    isDefault: boolean
}
export interface ServerDfsp {
    name: string,
    currency: string | number | undefined
}

export interface ServerInitialPosition{
    limit: {type: string, value: string}, 
    currency: string | number | undefined, 
    initialPosition: number,
}

export interface MainPayloadInitialPosition{
    initialPosition: ServerInitialPosition,
    participantId: number
}