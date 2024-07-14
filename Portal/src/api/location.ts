import instance from '../lib/axiosInstance'
import { LocationForm, UpdateLocationForm } from '../lib/validations/location'
import { LocationResponse } from '../types/apiResponses'

export async function addNewLocation(locationObj: LocationForm) {
  const response = await instance.post<{ message: string }>('/location', locationObj)
  return response.data
}

export async function getLocations(isActive?: boolean) {
  const response = await instance.get<{ locations: LocationResponse [], message: string, numberOfPages: number }>(`/location/all${isActive ? `?isActive=${isActive}` : ''}`)
  return response.data
}

export async function updateLocation(updateLocationObj: UpdateLocationForm) {
  const response = await instance.put<{ message: string }>(`/location/${updateLocationObj.locationId}`, {
    location: updateLocationObj.location,
    isActive: updateLocationObj.isActive
  })
  return response.data
}

export async function deletLocation(locationId: number) {
  const response = await instance.delete<{ message: string }>(`/location/${locationId}`)
  return response.data
}