import { z } from 'zod';

export const checkoutFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'ФИО должно содержать минимум 2 символа')
      .max(100, 'ФИО не должно превышать 100 символов')
      .regex(/^[а-яёА-ЯЁa-zA-Z\s-]+$/, 'ФИО может содержать только буквы, пробелы и дефисы'),

    phone: z
      .string()
      .min(11, 'Номер телефона должен содержать 11 цифр')
      .max(11, 'Номер телефона должен содержать 11 цифр')
      .regex(/^[78]\d{10}$/, 'Номер телефона должен начинаться с 7 или 8 и содержать 11 цифр'),

    email: z
      .string()
      .email('Некорректный email адрес')
      .min(5, 'Email должен содержать минимум 5 символов')
      .max(100, 'Email не должен превышать 100 символов'),

    deliveryType: z.enum(['pickup', 'delivery'], {
      required_error: 'Выберите способ получения',
    }),

    deliveryAddress: z
      .string()
      .min(5, 'Адрес должен содержать минимум 5 символов')
      .max(200, 'Адрес не должен превышать 200 символов')
      .optional(),

    address: z
      .object({
        city: z.string().max(50, 'Город не должен превышать 50 символов').optional(),
        street: z.string().max(100, 'Улица не должна превышать 100 символов').optional(),
        house: z.string().max(10, 'Номер дома не должен превышать 10 символов').optional(),
        apartment: z.string().max(10, 'Номер квартиры не должен превышать 10 символов').optional(),
      })
      .optional(),

    notes: z.string().max(500, 'Примечания не должны превышать 500 символов').optional(),

    paymentMethod: z.enum(['online', 'cash'], {
      required_error: 'Выберите способ оплаты',
    }),
  })
  .refine(
    data => {
      if (data.deliveryType === 'delivery') {
        return (
          data.address &&
          data.address.city &&
          data.address.street &&
          data.address.house &&
          data.address.city.length >= 2 &&
          data.address.street.length >= 2 &&
          data.address.house.length >= 1
        );
      }
      return true;
    },
    {
      message: 'Заполните все обязательные поля адреса',
      path: ['address'],
    }
  );

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
