import { z } from 'zod';

export const loginSchema = z.object({
    access_token: z.string(),
});

export type login = z.infer<typeof loginSchema>;
