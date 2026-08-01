import { z } from 'zod'

export const CompleteRequest = z.object({
  quizScore: z.number().int().min(0).max(100),
})

export type CompleteRequest = z.infer<typeof CompleteRequest>
