import instance from '../lib/axiosInstance'
import { TopNewsAndNoticesForm, UpdateTopNewsAndNoticesForm } from '../lib/validations/topParishNewsAndNotices'
import { TopNewsAndNoticesResponse } from '../types/apiResponses'

export async function addNewTopNewsAndNotices(topNewsAndNoticesObj: TopNewsAndNoticesForm) {
  const response = await instance.post<{ message: string }>('/top-news-and-notices', topNewsAndNoticesObj)
  return response.data
}

export async function getAllTopNewsAndNotices() {
  const response = await instance.get<{ topParishNewsAndNotices: TopNewsAndNoticesResponse[], message: string, numberOfPages: number }>('/top-news-and-notices/all')
  return response.data
}

export async function updateTopNewsAndNotices(UpdateTopParishNewsAndNotices: UpdateTopNewsAndNoticesForm) {
  const response = await instance.put<{ message: string }>(`/top-news-and-notices/${UpdateTopParishNewsAndNotices.topNewsOrNoticeId}`, {
    title: UpdateTopParishNewsAndNotices.title,
    description: UpdateTopParishNewsAndNotices.description,
    isActive: UpdateTopParishNewsAndNotices.isActive,
  })
  return response.data
}

// export async function deletLocation(locationId: number) {
//   const response = await instance.delete<{ message: string }>(`/location/${locationId}`)
//   return response.data
// }