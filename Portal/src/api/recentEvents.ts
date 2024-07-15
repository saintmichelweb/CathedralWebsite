import instance from '../lib/axiosInstance'
import { AddRecentEventsForm, UpdateRecentEventsForm } from '../lib/validations/recentEvents'
import { RecentEventResponse } from '../types/apiResponses'

export async function addNewRecentEvent(recentEventObj: AddRecentEventsForm) {
  const response = await instance.post<{ message: string }>('/recent-events', recentEventObj)
  return response.data
}

export async function getAllRecentEvents() {
  const response = await instance.get<{ recentEvents: RecentEventResponse[], message: string, numberOfPages: number }>('/recent-events/all')
  return response.data
}

export async function updateRecentEvent(UpdateRecentEventObj: UpdateRecentEventsForm) {
  const response = await instance.put<{ message: string }>(`/recent-events/${UpdateRecentEventObj.recentEventId}`, {
    title: UpdateRecentEventObj.title,
    description: UpdateRecentEventObj.description,
    isActive: UpdateRecentEventObj.isActive,
  })
  return response.data
}

// export async function deletLocation(locationId: number) {
//   const response = await instance.delete<{ message: string }>(`/location/${locationId}`)
//   return response.data
// }