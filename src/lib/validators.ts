// Zod schemas for forms
import { z } from 'zod';

export const CreateActivitySchema = z.object({
  name: z.string().min(3, 'Please enter a name (min 3 chars).'),
  description: z.string().min(10, 'Description too short.'),
  tags: z.array(z.string().min(1)).min(1, 'Please add at least one tag.')
});

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Min 6 chars'),
  displayName: z.string().min(2, 'Min 2 chars')
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const ProfileSchema = z.object({
  displayName: z.string().min(2).optional(),
  bio: z.string().max(300).optional(),
  interests: z.array(z.string()).optional()
});