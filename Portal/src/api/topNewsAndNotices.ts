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
    title_en: UpdateTopParishNewsAndNotices.title_en,
    description_en: UpdateTopParishNewsAndNotices.description_en,
    title_fr: UpdateTopParishNewsAndNotices.title_fr,
    description_fr: UpdateTopParishNewsAndNotices.description_fr,
    title_rw: UpdateTopParishNewsAndNotices.title_rw,
    description_rw: UpdateTopParishNewsAndNotices.description_rw,
    isActive: UpdateTopParishNewsAndNotices.isActive,
  })
  return response.data
}

export async function deleteTopNewsAndNotices(topNewsAndNoticId: number) {
  const response = await instance.delete<{ message: string }>(`/top-news-and-notices/${topNewsAndNoticId}`)
  return response.data
}