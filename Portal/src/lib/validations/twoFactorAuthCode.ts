import { z } from 'zod'

export type TwoFactorAuthCodeForm = z.infer<typeof TwoFactorAuthCodeSchema>

export const TwoFactorAuthCodeSchema = z.object({
  verificationCode: z.string().min(6, { message: 'Verification code must be at least 6 characters long' }),
});