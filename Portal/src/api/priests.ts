import instance from '../lib/axiosInstance'
import { AddPriestsForm, UpdatePriestsForm } from '../lib/validations/priests'
import { PriestsResponse } from '../types/apiResponses'

export async function addNewPriest(priestObj: AddPriestsForm) {
  const response = await instance.post<{ message: string }>('/priests', priestObj)
  return response.data
}

export async function getAllPriests() {
  const response = await instance.get<{ priests: PriestsResponse[], message: string }>('/priests/all')
  return response.data
}

export async function updatePriest(UpdatePriestObj: UpdatePriestsForm) {
  const response = await instance.put<{ message: string }>(`/priests/${UpdatePriestObj.priestId}`, {
    name: UpdatePriestObj.name,
    title: UpdatePriestObj.title,
    description_en: UpdatePriestObj.description_en,
    description_fr: UpdatePriestObj.description_fr,
    description_rw: UpdatePriestObj.description_rw,
    backgroundImageId: UpdatePriestObj.backgroundImageId,
  })
  return response.data
}

export async function deletePriest(priestId: number) {
  const response = await instance.delete<{ message: string }>(`/priests/${priestId}`)
  return response.data
}