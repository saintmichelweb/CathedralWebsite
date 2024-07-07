import instance from '../lib/axiosInstance'
import { MassLocationForm } from '../lib/validations/location'

export async function addNewLocation(locationObj: MassLocationForm) {
  const response = await instance.post<{ message: string }>('/location', locationObj)
  return response.data
}