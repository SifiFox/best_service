import { z } from 'zod';

export const loginPhoneSchema = z.object({
  phone: z.string().min(10, 'Номер телефона должен содержать минимум 10 символов'),
});

export const verifySmsSchema = z.object({
  phone: z.string().min(10, 'Номер телефона должен содержать минимум 10 символов'),
  smsCode: z.string().length(4, 'Код должен содержать 4 цифры'),
});

export type LoginFormSchema = z.infer<typeof loginPhoneSchema>;
export type VerifySmsFormSchema = z.infer<typeof verifySmsSchema>;
