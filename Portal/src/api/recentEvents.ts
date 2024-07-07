import instance from '../lib/axiosInstance'
import { RecentEventsForm } from '../lib/validations/recentEvents'

export async function addNewRecentEvent(recentEventObj: RecentEventsForm) {
  const response = await instance.post<{ message: string }>('/recent-events', recentEventObj)
  return response.data
}