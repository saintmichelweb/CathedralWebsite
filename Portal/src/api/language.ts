import instance from '../lib/axiosInstance'
import { MassLanguageForm } from '../lib/validations/language'
import { LanguageResponse } from '../types/apiResponses'

export async function addNewLanguage(languageObj: MassLanguageForm) {
  const response = await instance.post<{ message: string }>('/language', languageObj)
  return response.data
}

export async function getLanguages() {
    const response = await instance.get<{ languages: LanguageResponse [], message: string, languageCount: number }>('/language/all')
    return response.data
  }