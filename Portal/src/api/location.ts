import instance from '../lib/axiosInstance'
import { LocationForm, UpdateLocationForm } from '../lib/validations/location'
import { LocationResponse } from '../types/apiResponses'
import { PaginationParams } from '../types/params'

export async function addNewLocation(locationObj: LocationForm) {
  const response = await instance.post<{ message: string }>('/location', locationObj)
  return response.data
}

export async function getLocations(params: PaginationParams, isMassLocation?: boolean, isActive?: boolean) {
  let apiPath = `/location/all?`
  if (isActive) apiPath += `isActive=${isActive}`
  if (isActive && isMassLocation) apiPath += `&isMassLocation=${isMassLocation}`
  if (!isActive && isMassLocation) apiPath += `isMassLocation=${isMassLocation}`
  console.log(apiPath)
  const response = await instance.get<{ locations: LocationResponse[], message: string, totalPages: number }>(apiPath, {params})
  return response.data
}

export async function updateLocation(updateLocationObj: UpdateLocationForm) {
  const response = await instance.put<{ message: string }>(`/location/${updateLocationObj.locationId}`, {
    location: updateLocationObj.location,
    isActive: updateLocationObj.isActive,
    isMassLocation: updateLocationObj.isMassLocation,

  })
  return response.data
}

export async function deletLocation(locationId: number) {
  const response = await instance.delete<{ message: string }>(`/location/${locationId}`)
  return response.data
}