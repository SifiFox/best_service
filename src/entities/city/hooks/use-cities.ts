import { useQuery } from '@tanstack/react-query';

import { cityApi } from '../api/city-api';

// Хук для получения всех городов
export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: () => cityApi.getCities(),
    staleTime: 10 * 60 * 1000, // 10 минут
  });
}
