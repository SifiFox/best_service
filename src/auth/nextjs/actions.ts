import z from 'zod';

import { loginSchema } from '@/lib/validations/login';
import { loginPhoneSchema, verifySmsSchema } from '@/lib/validations/login-phone';
import { registerSchema } from '@/lib/validations/register';

import { authApi } from '@/entities/auth/api/auth-api';
import { userApi } from '@/entities/user/api/user-api';

import { serverLogout } from './cookie-actions';

export async function login(unsafeData: z.infer<typeof loginSchema>) {
  const { success, data, error } = loginSchema.safeParse(unsafeData);

  if (!success) {
    return {
      success: false,
      error: 'Неверные данные формы',
      fieldErrors: error.flatten().fieldErrors,
    };
  }

  try {
    const authResponse = await authApi.login({
      username: data.username,
      password: data.password,
      grant_type: 'password',
    });
    return {
      success: true,
      data: authResponse,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ошибка авторизации',
    };
  }
}

export async function loginPhone(unsafeData: z.infer<typeof loginPhoneSchema>) {
  const { success, data, error } = loginPhoneSchema.safeParse(unsafeData);

  if (!success) {
    return {
      success: false,
      error: 'Неверные данные формы',
      fieldErrors: error.flatten().fieldErrors,
    };
  }

  try {
    const authResponse = await authApi.sendSms({
      phone_number: parseInt(data.phone.replace(/\D/g, '')),
    });

    return {
      success: true,
      data: authResponse,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ошибка авторизации',
    };
  }
}

export async function register(unsafeData: z.infer<typeof registerSchema>) {
  const { success, data, error } = registerSchema.safeParse(unsafeData);

  if (!success) {
    return {
      success: false,
      error: 'Неверные данные формы',
      fieldErrors: error.flatten().fieldErrors,
    };
  }

  // Проверка совпадения паролей
  if (data.password !== data.confirmPassword) {
    return {
      success: false,
      error: 'Пароли не совпадают',
      fieldErrors: {
        confirmPassword: ['Пароли не совпадают'],
      },
    };
  }

  try {
    const userResponse = await userApi.createUser({
      username: data.username,
      email: data.email,
      phone: parseInt(data.phone.replace(/\D/g, '')),
      first_name: data.name,
      last_name: data.surname,
      birth_date: null,
      city_id: Number(data.city),
      is_active: true,
      password: data.password,
    });

    return {
      success: true,
      data: userResponse,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ошибка регистрации',
    };
  }
}

export async function verifySms(unsafeData: z.infer<typeof verifySmsSchema>) {
  const { success, data, error } = verifySmsSchema.safeParse(unsafeData);

  if (!success) {
    return {
      success: false,
      error: 'Неверные данные формы',
      fieldErrors: error.flatten().fieldErrors,
    };
  }

  try {
    const authResponse = await authApi.verifySms({
      phone_number: parseInt(data.phone.replace(/\D/g, '')),
      sms_code: parseInt(data.smsCode || ''),
    });

    return {
      success: true,
      data: authResponse,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ошибка верификации СМС',
    };
  }
}

export async function logout() {
  await serverLogout();
}
