import { z } from 'zod'

export type SetPasswordForm = z.infer<typeof setPasswordSchema>

export const setPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .nullable()
      .default(null),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine(val => /[a-z]/.test(val), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine(val => /[A-Z]/.test(val), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine(val => /[0-9]/.test(val), {
        message: 'Password must contain at least one digit',
      })
      .refine(val => /[^a-zA-Z0-9]/.test(val), {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string().min(1, 'Password must contain at least 8 characters'),
  })
  .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
