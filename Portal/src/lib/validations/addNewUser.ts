import { z } from 'zod'

export type AddNewUserForm = z.infer<typeof addNewUserSchema>

export const addNewUserSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().trim().email('Please enter a valid email'),
  position: z.string().trim().min(1, { message: 'Position is required' }),
  phone: z
    .string()
    .length(10, { message: 'Phone number must have a length of 10 digits ' })
    .refine(val => val.startsWith('07'), {
      message: 'Phone number must start with 07',
    })
    .refine(val => !isNaN(Number(val)), {
      message: 'Phone number must be 10 digits',
    })
    .refine(val => parseInt(val) > 699999999, {
      message: 'Phone number must not contain a "."',
    }),
  // role: z.number().optional(),
})

export type EditUserForm = z.infer<typeof addUserSchema>

const addUserSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().trim().email('Please enter a valid email'),
  position: z.string().trim().min(1, { message: 'Position is required' }),
  phone: z
    .string()
    .length(10, { message: 'Phone number must have a length of 10 digits ' })
    .refine(val => val.startsWith('07'), {
      message: 'Phone number must start with 07',
    })
    .refine(val => !isNaN(Number(val)), {
      message: 'Phone number must be 10 digits',
    })
    .refine(val => parseInt(val) > 699999999, {
      message: 'Phone number must not contain a "."',
    }),
  status: z.string().trim().min(1, { message: 'Status is required' }),
  userId: z.number(),
})