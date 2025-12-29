import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Логин должен содержать минимум 3 символа'),
  name: z.string().min(1, 'Имя должно содержать минимум 1 символ'),
  surname: z.string().min(1, 'Фамилия должна содержать минимум 1 символ'),
  city: z.string().min(1, 'Город должен содержать минимум 1 символ'), // ID города как строка
  email: z.string().email('Неверный формат email'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
  confirmPassword: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
  phone: z.string().min(10, 'Номер телефона должен содержать минимум 10 символов'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
