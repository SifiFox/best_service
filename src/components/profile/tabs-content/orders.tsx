'use client';

import { useState } from 'react';

import { getFullName } from '@/lib/utils';

import ModalOrder from '@/components/modals/modal-order/modal-order';
import ModalPayment from '@/components/modals/modal-payment/modal-payment';

import { useOrders } from '@/entities/order/hooks/use-order';
import { Order as ApiOrder } from '@/entities/order/types';
import { useCurrentUser } from '@/entities/user/hooks/use-user';

import OrderCard from '../ui/order-card';

// Функция для форматирования даты
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  } catch {
    return dateString;
  }
}

// Функция для маппинга статуса API в локальный статус
function mapStatus(status: { name: string } | null): 'ontheway' | 'delivered' | 'rejected' {
  if (!status || !status.name) return 'ontheway';

  const statusName = status.name.toLowerCase();
  if (
    statusName.includes('доставлен') ||
    statusName.includes('выполнен') ||
    statusName.includes('готово')
  )
    return 'delivered';
  if (statusName.includes('отклонен') || statusName.includes('отменен')) return 'rejected';
  return 'ontheway';
}

// Функция для преобразования API заказа в локальный формат
function transformOrder(apiOrder: ApiOrder) {
  return {
    id: apiOrder.id,
    number: apiOrder.id,
    title: `Заказ #${apiOrder.id}`,
    description: apiOrder.comment || 'Описание заказа отсутствует',
    createdAt: formatDate(apiOrder.time_create),
    isRead: true,
    status: mapStatus(apiOrder.status),
    originalStatus: apiOrder.original_status,
    totalPrice: apiOrder.total_price || 0,
    address: apiOrder.address || 'Адрес не указан',
    comment: apiOrder.comment || '',
    paymentMethod: 'cash' as const,
    master: apiOrder.master,
    services: apiOrder.services,
  };
}

export default function Orders() {
  const { data: orders, isLoading, error } = useOrders();
  const { data: user } = useCurrentUser();
  const [modalState, setModalState] = useState({
    isOpen: false,
    order: null as ReturnType<typeof transformOrder> | null,
  });

  const [paymentModalState, setPaymentModalState] = useState({
    isOpen: false,
    orderId: 0,
    amount: 0,
    orderNumber: '',
    email: '',
    fullName: '',
  });

  const onClose = () => {
    setModalState({
      isOpen: false,
      order: null,
    });
  };

  const onPaymentClose = () => {
    setPaymentModalState({
      isOpen: false,
      orderId: 0,
      amount: 0,
      orderNumber: '',
      email: '',
      fullName: '',
    });
  };

  const handlePaymentClick = (order: ReturnType<typeof transformOrder>) => {
    setPaymentModalState({
      isOpen: true,
      orderId: order.id,
      amount: order.totalPrice,
      orderNumber: order.number.toString(),
      email: user?.email || '',
      fullName: getFullName(user?.first_name || null, user?.last_name || null) || '',
    });
  };

  if (isLoading) {
    return (
      <div className="mt-10 flex w-full items-center justify-center px-4 lg:px-20 xl:px-30 2xl:px-50">
        <div className="text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2" />
          <p className="text-muted-foreground mt-2">Загрузка заказов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 flex w-full items-center justify-center px-4 lg:px-20 xl:px-30 2xl:px-50">
        <div className="text-center">
          <p className="text-destructive">Ошибка загрузки заказов</p>
          <p className="text-muted-foreground mt-1 text-sm">Попробуйте обновить страницу</p>
        </div>
      </div>
    );
  }

  const transformedOrders = orders?.map(transformOrder) || [];

  if (transformedOrders.length === 0) {
    return (
      <div className="mt-10 flex w-full items-center justify-center px-4 lg:px-20 xl:px-30 2xl:px-50">
        <div className="text-center">
          <p className="text-muted-foreground">Заказов нет</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-4 px-4 md:grid-cols-2 md:gap-6 lg:mt-15 lg:grid-cols-3 lg:px-20 xl:px-30 2xl:px-50">
      {transformedOrders.map(order => (
        <OrderCard
          key={order.id}
          onClick={() => setModalState({ isOpen: true, order })}
          onPaymentClick={() => handlePaymentClick(order)}
          order={order}
        />
      ))}
      <ModalOrder modalState={modalState} onClose={onClose} />
      <ModalPayment
        amount={paymentModalState.amount}
        email={paymentModalState.email}
        fullName={paymentModalState.fullName}
        modalState={paymentModalState}
        onClose={onPaymentClose}
      />
    </div>
  );
}

export type Order = ReturnType<typeof transformOrder>;
