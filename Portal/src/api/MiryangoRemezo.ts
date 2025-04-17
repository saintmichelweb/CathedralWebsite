import instance from '../lib/axiosInstance'
import { AddMiryangoRemezoForm, UpdateMiryangoRemezoForm } from '../lib/validations/MiryangoRemezo'
import { MiryangoremezoResponse } from '../types/apiResponses'
import { PaginationParams } from '../types/params'

export async function addNewMuryangoRemezo(priestObj: AddMiryangoRemezoForm) {
  const response = await instance.post<{ message: string }>('/miryangoremezo', priestObj)
  return response.data
}

export async function getAllMuryangoRemezo(params: PaginationParams) {
  const response = await instance.get<{ miryangoRemezo: MiryangoremezoResponse[], message: string, totalPages: number }>('/miryangoremezo/all', {params})
  return response.data
}

export async function updateMuryangoRemezo(UpdateMuryangoRemezoObj: UpdateMiryangoRemezoForm) {
  const response = await instance.put<{ message: string }>(`/miryangoremezo/${UpdateMuryangoRemezoObj.muryangoRemezoId}`, {
    title: UpdateMuryangoRemezoObj.title,
    header: UpdateMuryangoRemezoObj.header,
    phone: UpdateMuryangoRemezoObj.phone,
    mpuzaId: UpdateMuryangoRemezoObj.mpuzaId
  })
  return response.data
}

export async function deleteMuryangoRemezo(muryangoRemezoId: number) {
  const response = await instance.delete<{ message: string }>(`/miryangoremezo/${muryangoRemezoId}`)
  return response.data
}