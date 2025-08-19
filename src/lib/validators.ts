// apps/frontend/src/lib/validators.ts
import { z } from 'zod';

export const CreateActivitySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(4),
  tags: z.array(z.string()).min(1),
  date: z.string().optional()
});
export type CreateActivityInput = z.infer<typeof CreateActivitySchema>;
