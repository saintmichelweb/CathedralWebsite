import type { ChangePassword, ServerUser } from '../types/users'
import instance from '../lib/axiosInstance'
import { EditUserForm, type AddNewUserForm } from '../lib/validations/addNewUser'
import { ForgotPasswordForm } from '../lib/validations/forgotPassword'
import { UsersResponse } from '../types/apiResponses'
import { PaginationParams } from '../types/params'

export async function getUsers(params: PaginationParams) {
  const response = await instance.get<{ users: UsersResponse[], message: string, totalPages: number }>('/users', {params})
  return response.data
}

export async function createUser(user: AddNewUserForm) {
  const response = await instance.post('/users/add', user)
  return response.data
}

export async function updateUser(user: EditUserForm) {
  const response = await instance.put(`/users/${user.userId}/edit`, user)
  return response.data
}

export async function getUserProfile() {
  const response = await instance.get<{ data: ServerUser }>('/users/profile')
  return response.data
}

export async function updateUserStatus(userId: string | number, newStatus: string) {
  const response = await instance.put(`/users/${userId}/status`, { status: newStatus })
  return response.data.data
}


export async function resendVerficationEmail(email: string) {
  const response = await instance.post('/users/sendVerificationEmail', { email })
  return response.data.message
}

export async function userSetPassword(setPasswordObj: ChangePassword) {
  const response = await instance.put('/users/reset-password', setPasswordObj)
  return response.data.message
}

export async function userForgotPassword(forgotPasswordObj: ForgotPasswordForm) {
  const response = await instance.post('/users/forgot-password', forgotPasswordObj)
  return response.data.message
}

export async function deleteUser(userId: number) {
  const response = await instance.delete<{ message: string }>(`/users/${userId}`)
  return response.data
}
