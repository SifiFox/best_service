import { useQuery } from '@tanstack/react-query';

import { serviceApi } from '../api/service-api';
import { Service } from '../types';

export function useServicesByCategory(typeId: number) {
  return useQuery<Service[], Error>({
    queryKey: ['services', typeId],
    queryFn: () => serviceApi.getServicesByCategory(typeId),
    enabled: !!typeId,
  });
}
