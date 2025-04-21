import instance from '../lib/axiosInstance';
import { AddActionForm } from '../lib/validations/CatholicAction';
import { ActionsResponse, MessageResponse } from '../types/apiResponses';
import { PaginationParams } from '../types/params';

// Add new action
export async function addNewAction(actionObj: AddActionForm) {
    const response = await instance.post<MessageResponse>('/catholic-actions', actionObj);
    return response.data;
}

// Get all actions with pagination
export async function getAllCatholicActions(params: PaginationParams) {
    const response = await instance.get<{
        actions: ActionsResponse[];
        message: string;
        totalPages: number;
    }>('/catholic-actions/all', { params });
    return response.data;
}

// Update existing action
export async function updateCatholicAction(actionObj: AddActionForm & { actionId: number }) {
    const response = await instance.put<MessageResponse>(`/catholic-actions/${actionObj.actionId}`, {
        name: actionObj.name,
        description_en: actionObj.description_en,
        description_rw: actionObj.description_rw,
        leaderName: actionObj.leaderName,
        phone: actionObj.phone,
    });
    return response.data;
}

// Delete action by ID
export async function deleteCatholicAction(actionId: number) {
    const response = await instance.delete<MessageResponse>(`/catholic-actions/${actionId}`);
    return response.data;
}
