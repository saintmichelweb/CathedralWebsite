import instance from '../lib/axiosInstance'
import { ParishHistoryForm } from '../lib/validations/parishHistory';
import { imageResponse, MessageResponse, ParishHistoryResponse } from '../types/apiResponses';

export async function addOrUpdateParishHistory(parishHitoryObj: ParishHistoryForm) {
    const response = await instance.post<MessageResponse>('parish-history', parishHitoryObj)
    return response.data
}


export async function getParishHistory() {
    const response = await instance.get<{ parishHistory: ParishHistoryResponse, message: string}>('/parish-history')
    return response.data
}