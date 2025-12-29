import { useQuery } from '@tanstack/react-query';

import { serviceApi } from '../api/service-api';
import { ServiceCategory } from '../types';

export function useServiceCategories() {
  return useQuery<ServiceCategory[], Error>({
    queryKey: ['serviceCategories'],
    queryFn: () => serviceApi.getServiceCategories(),
  });
}
