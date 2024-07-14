export interface LocationResponse {
    id: number
    location: string
    isActive: boolean
    created_at: string
    updated_at: string
}

export interface LanguageResponse {
    id: number
    language: string
    isActive: boolean
    created_at: string
    updated_at: string
}

export interface MassTimesResponse {
    id: number
    day: string
    time: string
    isActive: boolean
    created_at: string
    updated_at: string
    location: LocationResponse
    language: LanguageResponse
}


export interface MessageResponse {
    message: string
}