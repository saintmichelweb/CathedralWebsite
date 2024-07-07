import instance from '../lib/axiosInstance'
import { MassLocationForm } from '../lib/validations/location'
import { LocationResponse } from '../types/apiResponses'

export async function addNewLocation(locationObj: MassLocationForm) {
  const response = await instance.post<{ message: string }>('/location', locationObj)
  return response.data
}

export async function getLocations() {
  const response = await instance.get<{ locations: LocationResponse [], message: string, locationsCount: number }>('/location/all')
  return response.data
}