import instance from '../lib/axiosInstance'
import { LanguageForm, UpdateLanguageForm } from '../lib/validations/language'
import { LanguageResponse } from '../types/apiResponses'

export async function addNewLanguage(languageObj: LanguageForm) {
  const response = await instance.post<{ message: string }>('/language', languageObj)
  return response.data
}

export async function getLanguages(isActive?: boolean) {
  const response = await instance.get<{ languages: LanguageResponse[], message: string, numberOfPages: number }>(`/language/all${isActive ? `?isActive=${isActive}` : ''}`)
  return response.data
}


export async function updateLanguage(updateLocationObj: UpdateLanguageForm) {
  const response = await instance.put<{ message: string }>(`/language/${updateLocationObj.languageId}`, {
    language: updateLocationObj.language,
    isActive: updateLocationObj.isActive
  })
  return response.data
}

export async function deletLanguage(langaugeId: number) {
  const response = await instance.delete<{ message: string }>(`/language/${langaugeId}`)
  return response.data
}