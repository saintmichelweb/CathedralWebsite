import instance from '../lib/axiosInstance'
import { OfficeHoursForm, UpdateOfficeHoursForm } from '../lib/validations/officeHours'
import { OfficeHoursResponse } from '../types/apiResponses'
import { PaginationParams } from '../types/params'

export async function addNewOfficeHour(massTimeObj: OfficeHoursForm) {
  const response = await instance.post<{ message: string }>('/office-hours', massTimeObj)
  return response.data
}

export async function getAllOfficeHours(params: PaginationParams) {
  const response = await instance.get<{ officeHours: OfficeHoursResponse[], message: string, totalPages: number }>('/office-hours/all?isPortalRequest=true', {params})
  return response.data
}

export async function updateOfficeHour(UpdateOfficeHoursForm: UpdateOfficeHoursForm) {
  const response = await instance.put<{ message: string }>(`/office-hours/${UpdateOfficeHoursForm.OfficeHourId}`, {
    office_place: UpdateOfficeHoursForm.office_place,
    isActive: UpdateOfficeHoursForm.isActive,
    day_en: UpdateOfficeHoursForm.day_en,
    day_fr: UpdateOfficeHoursForm.day_fr,
    day_rw: UpdateOfficeHoursForm.day_rw,
    time: UpdateOfficeHoursForm.time
  })
  return response.data
}

// export async function deletLocation(locationId: number) {
//   const response = await instance.delete<{ message: string }>(`/location/${locationId}`)
//   return response.data
// }