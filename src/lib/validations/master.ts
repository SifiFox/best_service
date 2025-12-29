import { z } from 'zod';

import { isValidPhoneNumber } from '@/lib/phone';

export const masterFormSchema = z.object({
  phone: z.string().refine(isValidPhoneNumber, {
    message: 'Введите корректный номер телефона',
  }),
  name: z.string().optional(),
  email: z.string().email('Неверный формат email').optional().or(z.literal('')),
  message: z.string().optional(),
});

export type MasterFormData = z.infer<typeof masterFormSchema>;
