import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../api/auth-api';
import { AuthRequest, RecoveryPasswordRequest, SendSmsRequest, VerifySmsRequest } from '../types';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuthRequest) => authApi.login(data),
    onSuccess: () => {
      // Инвалидируем кэш пользователя
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (refreshToken: string) => authApi.refreshToken(refreshToken),
    onSuccess: data => {
      // Обновляем токены
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    },
  });
}

export function useSendSms() {
  return useMutation({
    mutationFn: (data: SendSmsRequest) => authApi.sendSms(data),
  });
}

export function useVerifySms() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifySmsRequest) => authApi.verifySms(data),
    onSuccess: () => {
      // Инвалидируем кэш пользователя
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });
}

export function useValidateToken() {
  return useQuery({
    queryKey: ['validate-token'],
    queryFn: () => authApi.validateToken(),
    enabled: !!localStorage.getItem('access_token'),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useRecoverPassword() {
  return useMutation({
    mutationFn: (data: RecoveryPasswordRequest) => authApi.recoverPassword(data),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Очищаем cookies
      try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
        cookieStore.delete('user_id');
      } catch {
        // console.warn('Не удалось очистить cookies:', error);
      }
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
