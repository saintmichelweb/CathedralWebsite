import instance from '../lib/axiosInstance'
import { imageResponse, BannerImageResponse } from '../types/apiResponses';
const formData = new FormData();
interface ImageObj { image: File, isBannerImage: boolean, bannerDescription?: string, isActive?: boolean }
interface updateImageObj { imageId: number, isBannerImage: boolean, bannerDescription: string, isActive?: boolean }

export async function addNewImage(imageObj: ImageObj ) {
    formData.append('image', imageObj.image);
    formData.append('isBannerImage', `${imageObj.isBannerImage}`);
    formData.append('bannerDescription', `${imageObj.bannerDescription}`);
    const response = await instance.post<{ message: string, image: imageResponse }>(`/image/upload`, formData)
    return response.data
}

export async function updateImage(imageObj: updateImageObj ) {
    const response = await instance.put<{ message: string }>(`/image/${imageObj.imageId}`, imageObj)
    return response.data
}

export async function getBannerImages(isBannerImage?: boolean) {
    const response = await instance.get<{ bannerImages: BannerImageResponse[], message: string, numberOfPages: number }>(`/images/all${isBannerImage ? `?isBannerImage=${isBannerImage}` : ''}`)
    return response.data
  }