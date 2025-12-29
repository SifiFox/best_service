import { BaseApi } from '@/shared/api/base-api';

import { PaymentResponse, UserPaymentsResponse } from '../types';

export class PaymentHistoryApi extends BaseApi {
  // Получение информации о платеже
  async getPayment(paymentId: number): Promise<PaymentResponse> {
    return this.get<PaymentResponse>(`/payments/${paymentId}`);
  }

  // Получение всех платежей пользователя
  async getUserPayments(userId: number): Promise<UserPaymentsResponse> {
    return this.get<UserPaymentsResponse>(`/payments/user/${userId}`);
  }
}

export const paymentHistoryApi = new PaymentHistoryApi();
