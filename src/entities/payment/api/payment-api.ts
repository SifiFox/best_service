import { BaseApi } from '@/shared/api/base-api';

import {
  ChargeResponse,
  CheckPaymentResponse,
  GetNotificationResponse,
  GetOrderResponse,
  NotificationPaymentRequest,
  NotificationPaymentResponse,
  ProcessOrderPaymentRequest,
  ProcessOrderPaymentResponse,
  ProcessPaymentResponse,
} from '../types';

export class PaymentApi extends BaseApi {
  // Создание платежа для подписки
  async processPayment(appId: number, subscribeTypeId: number): Promise<ProcessPaymentResponse> {
    return this.post<ProcessPaymentResponse>(`/t/process_payment/${appId}/${subscribeTypeId}`);
  }

  // Создание платежа для заказа
  async processOrderPayment(
    data: ProcessOrderPaymentRequest
  ): Promise<ProcessOrderPaymentResponse> {
    return this.post<ProcessOrderPaymentResponse>('/t/process_order_payment', data);
  }

  // Проверка статуса платежа
  async checkPayment(paymentId: number): Promise<CheckPaymentResponse> {
    return this.post<CheckPaymentResponse>(`/t/check_payment/${paymentId}`);
  }

  // Получение заказа
  async getOrder(orderId: number): Promise<GetOrderResponse> {
    return this.post<GetOrderResponse>(`/t/get_order/${orderId}`);
  }

  // Обработка уведомления о платеже
  async notificationPayment(
    data: NotificationPaymentRequest
  ): Promise<NotificationPaymentResponse> {
    return this.post<NotificationPaymentResponse>('/t/notification_payment', data);
  }

  // Получение уведомления
  async getNotification(paymentId: number): Promise<GetNotificationResponse> {
    return this.get<GetNotificationResponse>(`/t/notification/${paymentId}`);
  }

  // Автосписание (только для админа)
  async charge(subscriptionId: number): Promise<ChargeResponse> {
    return this.get<ChargeResponse>(`/t/Charge/${subscriptionId}`);
  }
}

export const paymentApi = new PaymentApi();
