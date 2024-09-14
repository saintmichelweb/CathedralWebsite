export interface LocationResponse {
    id: number
    location: string
    isActive: boolean
    isMassLocation: boolean
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
    title_en: string
    title_fr: string
    title_rw: string
    description_en: string
    description_fr: string
    description_rw: string
    isActive: boolean
    created_at: string
    updated_at: string
}

export interface RecentEventResponse {
    id: number
    title_en: string
    title_fr: string
    title_rw: string
    description_en: string
    description_fr: string
    description_rw: string
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
    history_en: string;
    history_rw: string;
    history_fr: string;
    mission_en: string;
    mission_fr: string;
    mission_rw: string;
    vision_en: string;
    vision_fr: string;
    vision_rw: string;
    created_at: Date;
    updated_at: Date;
}

export interface WelcomeMessageResponse {
    id: number;
    welcomeMessage_en: string;
    welcomeMessage_fr: string;
    welcomeMessage_rw: string;
    backgroundImage: imageResponse,
    created_at: Date;
    updated_at: Date;
}

export interface PriestsResponse {
    id: number
    name: string
    title: string
    description_en: string
    description_fr: string
    description_rw: string
    created_at: string
    updated_at: string
    backgroundImage: imageResponse | null
}

export interface ServicesResponse {
    id: number
    name_en: string
    name_fr: string
    name_rw: string
    description_en: string
    description_fr: string
    description_rw: string
    contact_person_name: string
    contact_person_phone_number: string
    work_days: string
    work_hours: string
    created_at: string
    updated_at: string
    backgroundImage: imageResponse | null
}

export interface parishCommitteeCouncilResponse {
    id: number
    names: string
    position_en: string
    position_fr: string
    position_rw: string
    description_en: string
    description_fr: string
    description_rw: string
    telephone: string
    email: string
    created_at: string
    updated_at: string
    backgroundImage: imageResponse | null
}

export interface commissionResponse {
    id: number
    name_en: string
    name_fr: string
    name_rw: string
    description_en: string
    description_fr: string
    description_rw: string
    contact_person_name: string
    contact_person_role: string
    contact_person_phone_number: string
    contact_person_email: string
    backgroundImage: imageResponse | null
    created_at: string
    updated_at: string
}
