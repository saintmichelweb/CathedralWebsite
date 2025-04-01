import instance from '../lib/axiosInstance'
import { AddRecentEventsForm, UpdateRecentEventsForm } from '../lib/validations/recentEvents'
import { RecentEventResponse } from '../types/apiResponses'
import { PaginationParams } from '../types/params'

export async function addNewRecentEvent(recentEventObj: AddRecentEventsForm) {
  const response = await instance.post<{ message: string }>('/recent-events', recentEventObj)
  return response.data
}

export async function getAllRecentEvents(params: PaginationParams) {
  const response = await instance.get<{ recentEvents: RecentEventResponse[], message: string, totalPages: number }>('/recent-events/all', {params})
  return response.data
}

export async function updateRecentEvent(UpdateRecentEventObj: UpdateRecentEventsForm) {
  const response = await instance.put<{ message: string }>(`/recent-events/${UpdateRecentEventObj.recentEventId}`, {
    title_en: UpdateRecentEventObj.title_en,
    description_en: UpdateRecentEventObj.description_en,
    title_fr: UpdateRecentEventObj.title_fr,
    description_fr: UpdateRecentEventObj.description_fr,
    title_rw: UpdateRecentEventObj.title_rw,
    description_rw: UpdateRecentEventObj.description_rw,
    isActive: UpdateRecentEventObj.isActive,
    backgroundImageId: UpdateRecentEventObj.backgroundImageId,
    event_date: UpdateRecentEventObj.event_date
  })
  return response.data
}

export async function deleteRecentEvent(recentEventId: number) {
  const response = await instance.delete<{ message: string }>(`/recent-events/${recentEventId}`)
  return response.data
}