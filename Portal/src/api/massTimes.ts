import instance from '../lib/axiosInstance'
import { MassTimesForm, UpdateMassTimesForm } from '../lib/validations/massTimes';
import { MassTimesResponse } from '../types/apiResponses'

export async function addNewMassTime(massTimeObj: MassTimesForm) {
  const response = await instance.post<{ message: string }>('/mass-times', massTimeObj)
  return response.data
}

export async function getAllMassTimes() {
  const response = await instance.get<{ massTimes: MassTimesResponse [], message: string, numberOfPages: number }>('/mass-times/all')
  return response.data
}

export async function updateMassTime(UpdateMassTimesForm: UpdateMassTimesForm) {
  const response = await instance.put<{ message: string }>(`/mass-times/${UpdateMassTimesForm.massTimeId}`, {
      location: UpdateMassTimesForm.location,
      language: UpdateMassTimesForm.language,
      isActive: UpdateMassTimesForm.isActive,
      day: UpdateMassTimesForm.day,
      time: UpdateMassTimesForm.time
  })
  return response.data
}

// export async function deletLocation(locationId: number) {
//   const response = await instance.delete<{ message: string }>(`/location/${locationId}`)
//   return response.data
// }