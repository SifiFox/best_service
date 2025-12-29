import { AppSchema, AppVersionSchema } from '@/shared/types/api';

// Типы для приложений
export type App = AppSchema;

export type AppsResponse = App[];

// Типы для версий приложений
export type AppVersionsResponse = AppVersionSchema[];

export type AppLatestVersionResponse = AppVersionSchema;
