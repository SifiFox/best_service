import { BaseApi } from '@/shared/api/base-api';

import { Order, OrderCreateRequest, OrderCreateResponse, OrdersResponse } from '../types';

export class OrderApi extends BaseApi {
  async getOrders(): Promise<OrdersResponse> {
    return this.get<OrdersResponse>('/orders/');
  }

  async getOrder(orderId: number): Promise<Order> {
    return this.get<Order>(`/order/${orderId}`);
  }

  async createOrder(data: OrderCreateRequest): Promise<OrderCreateResponse> {
    return this.post<OrderCreateResponse>('/order/', data);
  }
}

export const orderApi = new OrderApi();
