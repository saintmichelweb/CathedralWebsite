import instance from '../lib/axiosInstance'
import { UpdateWelcomeMessageForm, AddWelcomeMessageForm } from '../lib/validations/welcomeMessage';
import { WelcomeMessageResponse } from '../types/apiResponses'

export async function addWelcomeMessage(massTimeObj: AddWelcomeMessageForm) {
  const response = await instance.post<{ message: string }>('/welcomeMessage', massTimeObj)
  return response.data
}

export async function getWelcomeMessage() {
  const response = await instance.get<{ welcomeMessage: WelcomeMessageResponse[], message: string }>('/welcomeMessage')
  return response.data
}

export async function putWelcomeMessage(UpdateWelcomeMessageForm: UpdateWelcomeMessageForm) {
  const response = await instance.put<{ message: string }>(`/welcomeMessage/${UpdateWelcomeMessageForm.welcomeMessageId}`, {
      welcomeMessage_en: UpdateWelcomeMessageForm.welcomeMessage_en,
      welcomeMessage_fr: UpdateWelcomeMessageForm.welcomeMessage_fr,
      welcomeMessage_rw: UpdateWelcomeMessageForm.welcomeMessage_rw,
      backgroundImageId: UpdateWelcomeMessageForm.backgroundImageId,
  })
  return response.data
}