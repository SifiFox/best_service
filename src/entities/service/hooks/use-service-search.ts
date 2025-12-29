import { useQuery } from '@tanstack/react-query';

import { serviceApi } from '../api/service-api';

export function useServiceSearch(searchQuery: string) {
  return useQuery({
    queryKey: ['serviceSearch', searchQuery],
    queryFn: () => serviceApi.getGroupedServices({ search: searchQuery }),
    enabled: searchQuery.length > 0,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
