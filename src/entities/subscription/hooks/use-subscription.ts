import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { subscriptionApi } from '../api/subscription-api';

// Хук для отмены подписки
export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subId: number) => subscriptionApi.cancelSubscription(subId),
    onSuccess: () => {
      // Инвалидируем кэш подписок
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      });
    },
  });
}

// Хук для получения типов подписок приложения
export function useAppSubscriptionTypes(appId: number) {
  return useQuery({
    queryKey: ['app-subscription-types', appId],
    queryFn: () => subscriptionApi.getAppSubscriptionTypes(appId),
    enabled: !!appId,
    staleTime: 10 * 60 * 1000, // 10 минут
  });
}

// Хук для получения активной подписки приложения
export function useAppSubscription(appId: number) {
  return useQuery({
    queryKey: ['app-subscription', appId],
    queryFn: () => subscriptionApi.getAppSubscription(appId),
    enabled: !!appId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Хук для получения всех подписок
export function useAllSubscriptions() {
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => subscriptionApi.getAllSubscriptions(),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Хук для получения конкретной подписки
export function useSubscription(subscriptionId: number) {
  return useQuery({
    queryKey: ['subscription', subscriptionId],
    queryFn: () => subscriptionApi.getSubscription(subscriptionId),
    enabled: !!subscriptionId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Хук для получения подписок пользователя
export function useUserSubscriptions(userId: number) {
  return useQuery({
    queryKey: ['user-subscriptions', userId],
    queryFn: () => subscriptionApi.getUserSubscriptions(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
