import { useQuery } from '@tanstack/react-query';

import { paymentHistoryApi } from '../api/payment-history-api';

// Хук для получения информации о платеже
export function usePayment(paymentId: number) {
  return useQuery({
    queryKey: ['payment', paymentId],
    queryFn: () => paymentHistoryApi.getPayment(paymentId),
    enabled: !!paymentId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Хук для получения всех платежей пользователя
export function useUserPayments(userId: number) {
  return useQuery({
    queryKey: ['user-payments', userId],
    queryFn: () => paymentHistoryApi.getUserPayments(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
