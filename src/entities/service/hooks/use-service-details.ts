import { useQuery } from '@tanstack/react-query';

import { serviceApi } from '../api/service-api';
import { ServiceDetails } from '../types';

export function useServiceDetails(serviceId: number) {
  return useQuery<ServiceDetails, Error>({
    queryKey: ['serviceDetails', serviceId],
    queryFn: () => serviceApi.getServiceDetails(serviceId),
    enabled: !!serviceId,
  });
}
