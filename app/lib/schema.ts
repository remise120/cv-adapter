import { z } from 'zod'

export const FormDataSchema = z.object({
  education: z.string().min(1, 'education is required'),
  experience: z.string().min(1, 'experience is required'),
  skills: z.string().min(1, 'skills is required'),
  offer: z.string().min(1, 'offer is required'),
})
