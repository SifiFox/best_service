import Image from 'next/image';
import type { MouseEvent } from 'react';

import { cn, formatRelativeTime, oswaldStyle } from '@/lib/utils';
import { usePrintExistingOrder } from '@/hooks/use-print-existing-order';

import { Button } from '@/components/ui/button';

import type { Order } from '../tabs-content/orders';

export const TITLE_BY_STATUS = {
  ontheway: 'Ожидание',
  delivered: 'Завершено',
  rejected: 'Отклонен',
} as const;

export default function OrderCard({
  order,
  onClick,
  onPaymentClick,
}: {
  order: Order;
  onClick: () => void;
  onPaymentClick?: () => void;
}) {
  const {
    printOrder,
    isLoading: isPrintLoading,
    error,
    clearError,
    hasItems,
  } = usePrintExistingOrder({ order });

  const handlePaymentClick = (e: MouseEvent) => {
    e.stopPropagation();
    onPaymentClick?.();
  };

  const handlePrintClick = (e: MouseEvent) => {
    e.stopPropagation();
    printOrder();
  };

  return (
    <div
      className="flex cursor-pointer flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 lg:p-8"
      onClick={onClick}
    >
      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-2">
              <span
                className={cn(
                  'text-base font-semibold',
                  order.status === 'ontheway' && 'text-primary',
                  order.status === 'delivered' && 'text-green-500',
                  order.status === 'rejected' && 'text-primary'
                )}
                style={oswaldStyle}
              >
                {order.originalStatus?.name ||
                  TITLE_BY_STATUS[order.status as keyof typeof TITLE_BY_STATUS]}
              </span>
              <div className="flex items-center gap-6">
                <span className="text-base font-semibold lg:text-2xl">№{order.number}</span>
                <span className="text-base font-semibold text-gray-500">
                  {formatRelativeTime(order.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold">{order.comment}</p>
          </div>
        </div>
      </div>

      {/* Сообщение об ошибке */}
      {error && (
        <div className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-[#2E7D00]">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              className="text-primary hover:text-[#2E7D00]"
              onClick={clearError}
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button
          className="cursor-pointer w-fit"
          disabled={isPrintLoading || !hasItems}
          onClick={handlePrintClick}
          variant="secondary"
        >
          <Image alt="printer" height={20} src="/icons/printer.svg" width={20} />
        </Button>
        {order.status === 'ontheway' && onPaymentClick && (
          <div className="flex justify-end">
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={handlePaymentClick}
            >
              Оплатить {order.totalPrice} ₽
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
