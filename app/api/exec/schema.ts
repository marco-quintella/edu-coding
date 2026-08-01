import { z } from 'zod'

export const ExecRequest = z.object({
  lessonId: z.string().uuid(),
  code: z.string().min(1).max(50_000),
  apiKey: z.string().optional(),
})

export type ExecRequest = z.infer<typeof ExecRequest>
