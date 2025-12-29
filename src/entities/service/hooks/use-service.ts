import { useQuery } from '@tanstack/react-query';

import { serviceApi } from '../api/service-api';
import { Service } from '../types';

export function useService(serviceId: number) {
  return useQuery<Service, Error>({
    queryKey: ['service', serviceId],
    queryFn: () => serviceApi.getServiceById(serviceId),
    enabled: !!serviceId,
  });
}
