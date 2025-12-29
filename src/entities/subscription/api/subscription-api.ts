import { BaseApi } from '@/shared/api/base-api';

import {
  AppSubscriptionResponse,
  SubscriptionCancelResponse,
  SubscriptionResponse,
  SubscriptionsResponse,
  SubscriptionTypesResponse,
} from '../types';

export class SubscriptionApi extends BaseApi {
  // Отмена подписки
  async cancelSubscription(subId: number): Promise<SubscriptionCancelResponse> {
    return this.get<SubscriptionCancelResponse>(`/subscription/cancel/${subId}`);
  }

  // Получение типов подписок для приложения
  async getAppSubscriptionTypes(appId: number): Promise<SubscriptionTypesResponse> {
    return this.get<SubscriptionTypesResponse>(`/subscription_type/app/${appId}`);
  }

  // Получение активной подписки для приложения
  async getAppSubscription(appId: number): Promise<AppSubscriptionResponse> {
    return this.get<AppSubscriptionResponse>(`/subscriptions/app/${appId}`);
  }

  // Получение всех подписок
  async getAllSubscriptions(): Promise<SubscriptionsResponse> {
    return this.get<SubscriptionsResponse>('/subscriptions');
  }

  // Получение конкретной подписки
  async getSubscription(subscriptionId: number): Promise<SubscriptionResponse> {
    return this.get<SubscriptionResponse>(`/subscriptions/${subscriptionId}`);
  }

  // Получение подписок пользователя
  async getUserSubscriptions(userId: number): Promise<SubscriptionsResponse> {
    return this.get<SubscriptionsResponse>('/subscriptions/users', { user_id: userId });
  }
}

export const subscriptionApi = new SubscriptionApi();
