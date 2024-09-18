import instance from '../lib/axiosInstance'
import { AddChoirsForm, UpdateChoirsForm } from '../lib/validations/choirs'
import { ChoirsResponse } from '../types/apiResponses'

export async function addNewChoir(ChoirObj: AddChoirsForm) {
  const response = await instance.post<{ message: string }>('/Choir', ChoirObj)
  return response.data
}

export async function getAllChoirs() {
  const response = await instance.get<{ choirs: ChoirsResponse[], message: string }>('/Choir/all')
  return response.data
}

export async function updateChoir(UpdateChoirObj: UpdateChoirsForm) {
  const response = await instance.put<{ message: string }>(`/Choir/${UpdateChoirObj.choirId}`, {
    name: UpdateChoirObj.name,
    description_en: UpdateChoirObj.description_en,
    description_fr: UpdateChoirObj.description_fr,
    description_rw: UpdateChoirObj.description_rw,
    leader: UpdateChoirObj.leader,
    telephone: UpdateChoirObj.telephone,
    isActive: UpdateChoirObj.isActive,
    backgroundImageId: UpdateChoirObj.backgroundImageId,
  })
  return response.data
}

export async function deleteChoir(choirId: number) {
  const response = await instance.delete<{ message: string }>(`/Choir/${choirId}`)
  return response.data
}