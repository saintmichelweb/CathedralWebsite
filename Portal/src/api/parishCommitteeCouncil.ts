import instance from '../lib/axiosInstance'
import { AddParishCommitteeCouncilForm, UpdateParishCommitteeCouncilForm, } from '../lib/validations/parishCommitteeCouncil'
import { parishCommitteeCouncilResponse } from '../types/apiResponses'

export async function addNewparishCommitteeCouncil(priestObj: AddParishCommitteeCouncilForm) {
  const response = await instance.post<{ message: string }>('/parishCommitteeCouncil', priestObj)
  return response.data
}

export async function getAllparishCommitteeCouncils() {
  const response = await instance.get<{ parishCommitteeCouncils: parishCommitteeCouncilResponse[], message: string }>('/parishCommitteeCouncil/all')
  return response.data
}

export async function updateparishCommitteeCouncil(UpdateparishCommitteeCouncilObj: UpdateParishCommitteeCouncilForm) {
  const response = await instance.put<{ message: string }>(`/parishCommitteeCouncil/${UpdateparishCommitteeCouncilObj.parishCommitteeCouncilId}`, {
    names: UpdateparishCommitteeCouncilObj.names,
    position_en: UpdateparishCommitteeCouncilObj.position_en,
    position_fr: UpdateparishCommitteeCouncilObj.position_fr,
    position_rw: UpdateparishCommitteeCouncilObj.position_rw,
    description_en: UpdateparishCommitteeCouncilObj.description_en,
    description_fr: UpdateparishCommitteeCouncilObj.description_fr,
    description_rw: UpdateparishCommitteeCouncilObj.description_rw,
    telephone: UpdateparishCommitteeCouncilObj.telephone,
    email: UpdateparishCommitteeCouncilObj.email,
    backgroundImageId: UpdateparishCommitteeCouncilObj.backgroundImageId,
  })
  return response.data
}

export async function deleteparishCommitteeCouncil(parishCommitteeCouncilId: number) {
  const response = await instance.delete<{ message: string }>(`/parishCommitteeCouncil/${parishCommitteeCouncilId}`)
  return response.data
}