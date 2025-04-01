import instance from '../lib/axiosInstance'
import { AddServiceForm, UpdateServiceForm } from '../lib/validations/services'
import { ServicesResponse } from '../types/apiResponses'
import { PaginationParams } from '../types/params'

export async function addNewService(priestObj: AddServiceForm) {
  const response = await instance.post<{ message: string }>('/services', priestObj)
  return response.data
}

export async function getAllServices(params: PaginationParams) {
  const response = await instance.get<{ services: ServicesResponse[], message: string, totalPages: number }>('/services/all', {params})
  return response.data
}

export async function updateService(UpdateServiceObj: UpdateServiceForm) {
  const response = await instance.put<{ message: string }>(`/services/${UpdateServiceObj.servicesId}`, {
    name_en: UpdateServiceObj.name_en,
    name_fr: UpdateServiceObj.name_fr,
    name_rw: UpdateServiceObj.name_rw,
    description_en: UpdateServiceObj.description_en,
    description_fr: UpdateServiceObj.description_fr,
    description_rw: UpdateServiceObj.description_rw,
    work_hours: UpdateServiceObj.work_hours,
    work_days: UpdateServiceObj.work_days,
    contact_person_name: UpdateServiceObj.contact_person_name,
    contact_person_phone_number: UpdateServiceObj.contact_person_phone_number,
    backgroundImageId: UpdateServiceObj.backgroundImageId,
  })
  return response.data
}

export async function deleteService(ServiceId: number) {
  const response = await instance.delete<{ message: string }>(`/services/${ServiceId}`)
  return response.data
}