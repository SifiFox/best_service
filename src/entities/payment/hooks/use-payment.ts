import { useMutation, useQuery } from '@tanstack/react-query';

import { paymentApi } from '../api/payment-api';
import {
  CheckPaymentRequest,
  NotificationPaymentRequest,
  ProcessOrderPaymentRequest,
  ProcessPaymentRequest,
} from '../types';

export function usePayment() {
  // Создание платежа для подписки
  const processPayment = useMutation({
    mutationFn: ({ app_id, subscribe_type_id }: ProcessPaymentRequest) =>
      paymentApi.processPayment(app_id, subscribe_type_id),
  });

  // Создание платежа для заказа
  const processOrderPayment = useMutation({
    mutationFn: (data: ProcessOrderPaymentRequest) => paymentApi.processOrderPayment(data),
  });

  // Проверка статуса платежа
  const checkPayment = useMutation({
    mutationFn: ({ payment_id }: CheckPaymentRequest) => paymentApi.checkPayment(payment_id),
  });

  // Получение заказа
  const getOrder = useQuery({
    queryKey: ['order'],
    queryFn: () => paymentApi.getOrder(0), // Будет переопределено при вызове
    enabled: false,
  });

  // Обработка уведомления о платеже
  const notificationPayment = useMutation({
    mutationFn: (data: NotificationPaymentRequest) => paymentApi.notificationPayment(data),
  });

  // Получение уведомления
  const getNotification = useQuery({
    queryKey: ['notification'],
    queryFn: () => paymentApi.getNotification(0), // Будет переопределено при вызове
    enabled: false,
  });

  // Автосписание (только для админа)
  const charge = useMutation({
    mutationFn: ({ subscription_id }: { subscription_id: number }) =>
      paymentApi.charge(subscription_id),
  });

  return {
    processPayment,
    processOrderPayment,
    checkPayment,
    getOrder,
    notificationPayment,
    getNotification,
    charge,
  };
}
