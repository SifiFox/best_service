import { SubscriptionSchema, SubscriptionTypeSchema } from '@/shared/types/api';

// Типы для подписок
export type Subscription = SubscriptionSchema;

export type SubscriptionsResponse = Subscription[];

export type SubscriptionResponse = Subscription;

// Типы для типов подписок
export type SubscriptionType = SubscriptionTypeSchema;

export type SubscriptionTypesResponse = SubscriptionType[];

// Типы для отмены подписки
export type SubscriptionCancelResponse = string;

// Типы для подписки приложения
export type AppSubscriptionResponse = string;
