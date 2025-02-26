import instance from '../lib/axiosInstance'
import { imageResponse, BannerImageResponse } from '../types/apiResponses';
const formData = new FormData();
interface ImageObj {
    image: File,
    isBannerImage: boolean,
    bannerDescription_en?: string,
    bannerDescription_fr?: string,
    bannerDescription_rw?: string,
    isActive?: boolean
}
interface updateImageObj {
    imageId: number,
    isBannerImage: boolean,
    image?: File,
    bannerDescription_en?: string,
    bannerDescription_fr?: string,
    bannerDescription_rw?: string,
    isActive?: boolean
}

export async function addNewImage(imageObj: ImageObj) {
    formData.append('image', imageObj.image);
    if (imageObj.isBannerImage) {
        formData.append('isBannerImage', `${imageObj.isBannerImage}`);
        formData.append('bannerDescription_en', `${imageObj.bannerDescription_en}`);
        formData.append('bannerDescription_fr', `${imageObj.bannerDescription_fr}`);
        formData.append('bannerDescription_rw', `${imageObj.bannerDescription_rw}`);
    }
    const response = await instance.post<{ message: string, image: imageResponse }>(`/image/upload`, formData)
    return response.data
}

export async function updateImage(imageObj: updateImageObj) {
    if (imageObj.image) {
        formData.append('image', imageObj.image);
    }
    if (imageObj.isActive) {
        formData.append('isActive', `${imageObj.isActive}`);
    }
    if (imageObj.isBannerImage) {
        formData.append('isBannerImage', `${imageObj.isBannerImage}`);
        formData.append('bannerDescription_en', `${imageObj.bannerDescription_en}`);
        formData.append('bannerDescription_fr', `${imageObj.bannerDescription_fr}`);
        formData.append('bannerDescription_rw', `${imageObj.bannerDescription_rw}`);
    }
    const response = await instance.put<{ message: string }>(`/image/${imageObj.imageId}`, formData)
    return response.data
}

export async function deleteImage(imageId: number | string) {
    const response = await instance.delete<{ message: string }>(`/image/${imageId}`)
    return response.data
}

export async function getBannerImages(isBannerImage?: boolean) {
    const response = await instance.get<{ bannerImages: BannerImageResponse[], message: string, numberOfPages: number }>(`/images/all${isBannerImage ? `?isBannerImage=${isBannerImage}` : ''}`)
    return response.data
}