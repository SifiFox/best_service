import { useState } from 'react';

import { type DeliveryType } from '@/lib/constants';

import type { Order } from '@/components/profile/tabs-content/orders';

import { PrintService } from '@/services/print-service';

type UsePrintExistingOrderProps = {
  order: Order;
  deliveryMethod?: DeliveryType;
  deliveryCost?: number;
  deliveryDate?: string;
};

export function usePrintExistingOrder({
  order,
  deliveryMethod = 'pickup',
  deliveryCost = 0,
  deliveryDate,
}: UsePrintExistingOrderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const printOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Преобразуем заказ в формат, понятный PrintService
      const cartItems =
        order.services?.map(service => ({
          id: service.id,
          title: service.name || 'Услуга',
          price: parseFloat(service.price) * 100 || 0,
          quantity: service.quantity || 1,
          img: service.img || '',
        })) || [];

      await PrintService.printOrder(
        cartItems,
        cartItems.length,
        order.totalPrice * 100,
        deliveryMethod,
        deliveryCost,
        deliveryDate,
        order.number.toString()
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при печати';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cartItems =
        order.services?.map(service => ({
          id: service.id,
          title: service.name || 'Услуга',
          price: parseFloat(service.price) || 0,
          quantity: service.quantity || 1,
          img: service.img || '',
        })) || [];

      await PrintService.downloadOrderPDF(
        cartItems,
        cartItems.length,
        order.totalPrice,
        deliveryMethod,
        deliveryCost,
        deliveryDate,
        order.number.toString()
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при скачивании';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    printOrder,
    downloadOrder,
    isLoading,
    error,
    clearError,
    hasItems: (order.services?.length || 0) > 0,
  };
}
