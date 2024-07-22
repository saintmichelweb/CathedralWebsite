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
    imagePath: string
    isBannerImage: boolean
    isActive: boolean
    bannerDescription: string
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
    isActive: boolean
    created_at: string
    updated_at: string
    backgroundImage: imageResponse | null
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

export interface imageResponse {
    id: number
    imageUrl: string
    imagePath: string
    isActive: boolean
    created_at: Date
}
