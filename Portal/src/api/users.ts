import type { ServerUser } from '../types/users'
import instance from '../lib/axiosInstance'
import { EditUserForm, type AddNewUserForm } from '../lib/validations/addNewUser'
import type { AllData, PaginationParams } from '../types/pagination'
import { searchParams } from '../types/merchants'

export function transformIntoTableData(serverUser: ServerUser) {
  return {
    id: serverUser.id,
    name: serverUser.name,
    email: serverUser.email,
    phone_number: serverUser.phone_number,
    role: serverUser.role.name,
    dfsp: serverUser.dfsp?.name || 'N/A',
    status: serverUser.status,
    email_verification_status: serverUser.email_verification_status,
    role_id: serverUser.role.id,
  }
}

export async function getUsers(params?: PaginationParams | searchParams | AllData ) {
  try{
    const response = await instance.get<{ data: ServerUser[]; totalPages: number }>('/users', {params})

    if (response.status === 200) {
      const data = response.data.data.map(transformIntoTableData)
      const totalPages = response.data.totalPages
      return { data, totalPages }
    } else {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to fetch data. Please try again.')
  }
}

export async function fetchUsers(params?: PaginationParams | searchParams | AllData ) {
  const response = await instance.get<{ data: ServerUser[]; totalPages: number }>('/users', {params})
  return response.data
}

export async function createUser(user: AddNewUserForm) {
  const response = await instance.post('/users/add', user)
  return response.data
}

export async function updateUser(user: EditUserForm) {
  const response = await instance.patch(`/users/${user.userId}/edit`, user)
  return response.data
}

export async function getUserProfile() {
  const response = await instance.get<{ data: ServerUser }>('/users/profile')
  return response.data.data
}

export async function updateUserStatus(userId: string | number, newStatus: string) {
  const response = await instance.put(`/users/${userId}/status`, { status: newStatus })
  return response.data.data
}


export async function resendVerficationEmail(userId: string | number, email: string, role: string) {
  const response = await instance.post('/users/resendVerificationEmail', {userId, email, role})
  return response.data.message
}
