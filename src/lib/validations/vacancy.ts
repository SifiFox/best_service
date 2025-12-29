import { z } from 'zod';

export const vacancySchema = z.object({
  city: z.string().min(1, 'Город обязателен'), // ID города как строка
  phone: z.string().min(10, 'Телефон обязателен'),
  name: z.string().optional(),
});

export type RegisterSchema = z.infer<typeof vacancySchema>;
