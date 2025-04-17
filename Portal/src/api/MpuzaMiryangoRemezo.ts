import instance from '../lib/axiosInstance'
import { AddMpuzaMiryangoRemezoForm, UpdateMpuzaMiryangoRemezoForm } from '../lib/validations/MpuzaMiryangoRemezo'
import { MpuzaResponse } from '../types/apiResponses'
import { PaginationParams } from '../types/params'

export async function addNewMpuza(priestObj: AddMpuzaMiryangoRemezoForm) {
  const response = await instance.post<{ message: string }>('/mpuzamiryangoremezo', priestObj)
  return response.data
}

export async function getAllMpuza(params: PaginationParams) {
  const response = await instance.get<{ mpuzaMiryangoRemezo: MpuzaResponse[], message: string, totalPages: number }>('/mpuzamiryangoremezo/all', {params})
  return response.data
}

export async function updateMpuza(UpdateMpuzaObj: UpdateMpuzaMiryangoRemezoForm) {
  const response = await instance.put<{ message: string }>(`/mpuzamiryangoremezo/${UpdateMpuzaObj.mpuzMiryangoRemezoId}`, {
    title: UpdateMpuzaObj.title,
    leader: UpdateMpuzaObj.leader,
    phone: UpdateMpuzaObj.phone,
    description_fr: UpdateMpuzaObj.description_fr,
    description_en: UpdateMpuzaObj.description_en,
    description_rw: UpdateMpuzaObj.description_rw,
    backgroundImageId: UpdateMpuzaObj.backgroundImageId,
  })
  return response.data
}

export async function deleteMpuza(mpuzaId: number) {
  const response = await instance.delete<{ message: string }>(`/mpuzamiryangoremezo/${mpuzaId}`)
  return response.data
}