import { z } from 'zod';

export const verifyPhoneSchema = z.object({
  phone: z.string().min(10, 'Номер телефона должен содержать минимум 10 символов'),
});

export type VerifyPhoneFormSchema = z.infer<typeof verifyPhoneSchema>;
