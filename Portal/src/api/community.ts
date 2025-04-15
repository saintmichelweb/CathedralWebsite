import instance from '../lib/axiosInstance'
import { AddCommunityForm, UpdateCommunityForm } from '../lib/validations/community'
import { CommunityResponse } from '../types/apiResponses'
import { PaginationParams } from '../types/params'

export async function addNewCommunity(priestObj: AddCommunityForm) {
  const response = await instance.post<{ message: string }>('/communities', priestObj)
  return response.data
}

export async function getAllCommunities(params: PaginationParams) {
  const response = await instance.get<{ communities: CommunityResponse[], message: string, totalPages: number }>('/communities/all', {params})
  return response.data
}

export async function updateCommunity(UpdateCommunityObj: UpdateCommunityForm) {
  const response = await instance.put<{ message: string }>(`/communities/${UpdateCommunityObj.communityId}`, {
    name_en: UpdateCommunityObj.name
  })
  return response.data
}

export async function deleteCommunity(communityId: number) {
  const response = await instance.delete<{ message: string }>(`/communities/${communityId}`)
  return response.data
}