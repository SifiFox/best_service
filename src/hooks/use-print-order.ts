import { useState } from 'react';

import { type DeliveryType } from '@/lib/constants';

import { useCartStore } from '@/stores/cart-store';

import { PrintService } from '@/services/print-service';

type UsePrintOrderProps = {
  deliveryMethod?: DeliveryType;
  deliveryCost?: number;
  deliveryDate?: string;
};

export function usePrintOrder({
  deliveryMethod = 'pickup',
  deliveryCost = 0,
  deliveryDate,
}: UsePrintOrderProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const printOrder = async () => {
    if (items.length === 0) {
      setError('Корзина пуста. Добавьте товары для печати заказа.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await PrintService.printOrder(
        items,
        getTotalItems(),
        getTotalPrice(),
        deliveryMethod,
        deliveryCost,
        deliveryDate
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при печати';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadOrder = async () => {
    if (items.length === 0) {
      setError('Корзина пуста. Добавьте товары для скачивания заказа.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await PrintService.downloadOrderPDF(
        items,
        getTotalItems(),
        getTotalPrice(),
        deliveryMethod,
        deliveryCost,
        deliveryDate
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
    hasItems: items.length > 0,
  };
}
