import instance from '../lib/axiosInstance'
import { imageResponse } from '../types/apiResponses';
const formData = new FormData();

export async function addNewImage(imageObj: { image: File }) {
    formData.append('image', imageObj.image);
    const response = await instance.post<{ message: string, image: imageResponse }>('/upload/image', formData)
    return response.data
}