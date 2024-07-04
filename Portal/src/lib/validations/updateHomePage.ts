import { z } from 'zod'

export type MassTimesForm = z.infer<typeof MassTimesSchema>

export const MassTimesSchema = z.object({
  location: z.string().trim().min(1, { message: 'welcome Message is required' }),
  language: z.string().trim().email('Top news title'),
  day: z.string(),
  time: z.string()
})


export type MassLocationForm = z.infer<typeof massLocationSchema>

export const massLocationSchema = z.object({
  locationName: z.string().trim().min(1, { message: 'welcome Message is required' })
})

export type MassLanguageForm = z.infer<typeof massLanguageSchema>

export const massLanguageSchema = z.object({
  language: z.string().trim().min(1, { message: 'welcome Message is required' })
})

export type TopParishNewsAndNoticesForm = z.infer<typeof topParishNewsAndNoticesSchema>

export const topParishNewsAndNoticesSchema = z.object({
    title: z.string().trim().min(1, { message: 'welcome Message is required' }),
    description: z.string().trim().min(1, { message: 'welcome Message is required' })
})


export type RecentEventsForm = z.infer<typeof recentEventsSchema>

export const recentEventsSchema = z.object({
  title: z.string().trim().min(1, { message: 'welcome Message is required' }),
  description: z.string().trim().min(1, { message: 'welcome Message is required' })
})