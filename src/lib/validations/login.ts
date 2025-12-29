import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(2, 'Логин должен содержать минимум 2 символа'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
});

export type loginFormSchema = z.infer<typeof loginSchema>;
