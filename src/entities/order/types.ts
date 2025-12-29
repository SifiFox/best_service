import { OrderServiceCreate, OrderServiceResponse } from '@/shared/types/api';

export type Order = OrderServiceResponse;
export type OrdersResponse = Order[];

export type OrderCreateRequest = OrderServiceCreate;
export type OrderCreateResponse = string;
