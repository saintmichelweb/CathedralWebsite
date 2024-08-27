import instance from '../lib/axiosInstance'
import { AddCommissionForm, UpdateCommissionForm } from '../lib/validations/commission'
import { commissionResponse } from '../types/apiResponses'

export async function addNewCommission(priestObj: AddCommissionForm) {
  const response = await instance.post<{ message: string }>('/commissions', priestObj)
  return response.data
}

export async function getAllCommissions() {
  const response = await instance.get<{ commissions: commissionResponse[], message: string }>('/commissions/all')
  return response.data
}

export async function updateCommission(UpdateCommissionObj: UpdateCommissionForm) {
  const response = await instance.put<{ message: string }>(`/commissions/${UpdateCommissionObj.commissionId}`, {
    name_en: UpdateCommissionObj.name_en,
    name_fr: UpdateCommissionObj.name_fr,
    name_rw: UpdateCommissionObj.name_rw,
    contact_person_name: UpdateCommissionObj.contact_person_name,
    contact_person_email: UpdateCommissionObj.contact_person_email,
    contact_person_phone_number: UpdateCommissionObj.contact_person_phone_number,
    contact_person_role: UpdateCommissionObj.contact_person_role,
    description_en: UpdateCommissionObj.description_en,
    description_fr: UpdateCommissionObj.description_fr,
    description_rw: UpdateCommissionObj.description_rw,
    backgroundImageId: UpdateCommissionObj.backgroundImageId,
  })
  return response.data
}

export async function deleteCommission(commissionId: number) {
  const response = await instance.delete<{ message: string }>(`/commissions/${commissionId}`)
  return response.data
}