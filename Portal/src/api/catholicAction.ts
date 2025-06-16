import instance from '../lib/axiosInstance'
import { AddCatholicActionsForm, UpdateCatholicActionsForm } from '../lib/validations/catholicActions'
import { CatholicActionsResponse } from '../types/apiResponses'
import { PaginationParams } from '../types/params'

export async function addNewCatholicAction(CatholicActionObj: AddCatholicActionsForm) {
  const response = await instance.post<{ message: string }>('/catholic-actions', CatholicActionObj)
  return response.data
}

export async function getAllCatholicActions(params: PaginationParams) {
  const response = await instance.get<{ catholicActions: CatholicActionsResponse[], message: string, totalPages: number }>('/catholic-actions', {params})
  return response.data
}

export async function updateCatholicAction(UpdateCatholicActionObj: UpdateCatholicActionsForm) {
  const response = await instance.put<{ message: string }>(`/catholic-actions/${UpdateCatholicActionObj.catholicActionId}`, {
    name: UpdateCatholicActionObj.name,
    description_en: UpdateCatholicActionObj.description_en,
    description_fr: UpdateCatholicActionObj.description_fr,
    description_rw: UpdateCatholicActionObj.description_rw,
    leader: UpdateCatholicActionObj.leader,
    telephone: UpdateCatholicActionObj.telephone,
    isActive: UpdateCatholicActionObj.isActive,
    backgroundImageId: UpdateCatholicActionObj.backgroundImageId,
  })
  return response.data
}

export async function deleteCatholicAction(catholicActionId: number) {
  const response = await instance.delete<{ message: string }>(`/catholic-actions/${catholicActionId}`)
  return response.data
}