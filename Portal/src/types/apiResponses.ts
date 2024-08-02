export interface LocationResponse {
    id: number
    location: string
    isActive: boolean
    created_at: string
    updated_at: string
}

export interface BannerImageResponse {
    id: number
    imageUrl: string
    filename: string
    isBannerImage: boolean
    isActive: boolean
    bannerDescription_en: string
    bannerDescription_fr: string
    bannerDescription_rw: string
    created_at: string
}
export interface LanguageResponse {
    id: number
    language: string
    isActive: boolean
    created_at: string
    updated_at: string
}

export interface TopNewsAndNoticesResponse {
    id: number
    title: string
    description: string
    isActive: boolean
    created_at: string
    updated_at: string
}

export interface RecentEventResponse {
    id: number
    title: string
    description: string
    event_date: string
    isActive: boolean
    created_at: string
    updated_at: string
    backgroundImage: imageResponse | null
}

export interface MassTimesResponse {
    id: number
    day_en: string
    day_fr: string
    day_rw: string
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

export interface imageResponse {
    id: number
    imageUrl: string
    filename: string
    isActive: boolean
    created_at: Date
}


export interface ParishHistoryResponse {
    id: number;
    history: string;
    created_at: Date;
    updated_at: Date;
}
