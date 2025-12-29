import { AppSchema, AppVersionSchema, UserBase } from '@/shared/types/api';

// Типы для пользователей
export type User = UserBase;

export type UserCreate = UserBase;

export type UserUpdate = {
  email?: string | null;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
  birth_date?: string | null;
  city_id?: number;
  phone?: number | null;
  social_link?: string[] | null;
};

export type UserUpdateResponse = {
  email: string | null;
  full_name: string | null;
};

export type UserDeleteResponse = string;

// Типы для приложений пользователя
export type UserAppsResponse = AppSchema[];

export type UserAppResponse = AppSchema;

export type UserAppCurrentVersionResponse = AppVersionSchema;
