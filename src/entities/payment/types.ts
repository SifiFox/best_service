import { OrderSchema, PaymentNotification, PaymentSchema } from '@/shared/types/api';

// Типы для создания платежа
export type ProcessPaymentRequest = {
  app_id: number;
  subscribe_type_id: number;
};

export type ProcessPaymentResponse = PaymentSchema;

// Типы для оплаты заказов
export type ProcessOrderPaymentRequest = {
  order_id: number;
  payment_method: 'card' | 'cash';
  amount: number;
};

export type ProcessOrderPaymentResponse = PaymentSchema;

// Типы для проверки платежа
export type CheckPaymentRequest = {
  payment_id: number;
};

export type CheckPaymentResponse = PaymentSchema;

// Типы для получения заказа
export type GetOrderRequest = {
  order_id: number;
};

export type GetOrderResponse = OrderSchema;

// Типы для уведомлений о платежах
export type NotificationPaymentRequest = PaymentNotification;

export type NotificationPaymentResponse = string;

// Типы для получения уведомления
export type GetNotificationRequest = {
  payment_id: number;
};

export type GetNotificationResponse = string;

// Типы для автосписания
export type ChargeRequest = {
  subscription_id: number;
};

export type ChargeResponse = string;

// Типы для формы оплаты картой
export type CardPaymentFormData = {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
};

// Типы для статуса оплаты
export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';
