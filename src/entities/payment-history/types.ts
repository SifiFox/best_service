import { PaymentBase } from '@/shared/types/api';

// Типы для платежей
export type Payment = PaymentBase;

export type PaymentResponse = Payment;

export type UserPaymentsResponse = Payment[];
