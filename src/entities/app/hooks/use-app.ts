import { useQuery } from '@tanstack/react-query';

import { appApi } from '../api/app-api';

// Хук для получения всех приложений
export function useAllApps() {
  return useQuery({
    queryKey: ['apps'],
    queryFn: () => appApi.getAllApps(),
    staleTime: 10 * 60 * 1000, // 10 минут
  });
}

// Хук для получения версий приложения
export function useAppVersions(appId: number) {
  return useQuery({
    queryKey: ['app-versions', appId],
    queryFn: () => appApi.getAppVersions(appId),
    enabled: !!appId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Хук для получения последней версии приложения
export function useAppLatestVersion(appId: number) {
  return useQuery({
    queryKey: ['app-latest-version', appId],
    queryFn: () => appApi.getAppLatestVersion(appId),
    enabled: !!appId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
