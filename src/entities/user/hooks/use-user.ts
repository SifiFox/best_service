import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userApi } from '../api/user-api';
import { UserCreate, UserUpdate } from '../types';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => userApi.getCurrentUser(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserUpdate) => userApi.updateCurrentUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'me'],
      });
    },
    onError: () => {
      throw new Error('Ошибка при изменении данных пользователя');
    },
  });
}

export function useDeleteCurrentUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userApi.deleteCurrentUser(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserCreate) => userApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
}

export function useUserApps(userId: number) {
  return useQuery({
    queryKey: ['user', userId, 'apps'],
    queryFn: () => userApi.getUserApps(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserApp(userId: number, appId: number) {
  return useQuery({
    queryKey: ['user', userId, 'app', appId],
    queryFn: () => userApi.getUserApp(userId, appId),
    enabled: !!userId && !!appId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserAppCurrentVersion(userId: number, appId: number) {
  return useQuery({
    queryKey: ['user', userId, 'app', appId, 'current-version'],
    queryFn: () => userApi.getUserAppCurrentVersion(userId, appId),
    enabled: !!userId && !!appId,
    staleTime: 5 * 60 * 1000,
  });
}
