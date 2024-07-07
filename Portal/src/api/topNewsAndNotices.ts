import instance from '../lib/axiosInstance'
import { TopNewsAndNoticesForm } from '../lib/validations/recentEvents'

export async function addNewTopNewsAndNotices(topNewsAndNoticesObj: TopNewsAndNoticesForm) {
  const response = await instance.post<{ message: string }>('/top-news-and-notices', topNewsAndNoticesObj)
  return response.data
}