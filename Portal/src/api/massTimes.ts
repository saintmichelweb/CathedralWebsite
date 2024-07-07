import instance from '../lib/axiosInstance'
import { MassTimesForm } from '../lib/validations/massTimes'

export async function addNewMassTime(massTimeObj: MassTimesForm) {
  const response = await instance.post<{ message: string }>('/mass-times', massTimeObj)
  return response.data
}