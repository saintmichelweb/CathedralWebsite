import instance from '../lib/axiosInstance'
import { MassLanguageForm } from '../lib/validations/language'

export async function addNewLanguage(languageObj: MassLanguageForm) {
  const response = await instance.post<{ message: string }>('/language', languageObj)
  return response.data
}