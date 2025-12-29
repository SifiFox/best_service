import { useQuery } from '@tanstack/react-query';

import { serviceApi } from '../api/service-api';
import { GroupedServicesByDepartment, ServicesQueryParams } from '../types';

export function useGroupedServices(params?: ServicesQueryParams) {
  return useQuery<GroupedServicesByDepartment[], Error>({
    queryKey: ['groupedServices', params],
    queryFn: () => serviceApi.getGroupedServices(params),
    staleTime: 10 * 60 * 1000, // 10 минут
  });
}
