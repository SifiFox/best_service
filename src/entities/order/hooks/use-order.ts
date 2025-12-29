import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { clientOrderApi } from '../api/client-order-api';
import { OrderCreateRequest } from '../types';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => clientOrderApi.getOrders(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useOrder(orderId: number) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => clientOrderApi.getOrder(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrderCreateRequest) => clientOrderApi.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
