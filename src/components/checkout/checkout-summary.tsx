'use client';

import Image from 'next/image';
import { useState } from 'react';

import { type DeliveryType, deliveryTypes } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useCheckoutAccess } from '@/hooks/use-checkout-access';
import { usePrintOrder } from '@/hooks/use-print-order';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { useCartStore } from '@/stores/cart-store';

type CheckoutSummaryProps = {
  deliveryPrice: number;
  onPaymentAction: () => void;
  isFormValid: boolean;
  paymentMethod: string;
  isLoading?: boolean;
  deliveryMethod: DeliveryType;
};

export default function CheckoutSummary({
  deliveryPrice,
  onPaymentAction,
  isFormValid,
  paymentMethod,
  isLoading = false,
  deliveryMethod,
}: CheckoutSummaryProps) {
  const { getTotalPrice } = useCartStore();
  const { hasItems } = useCheckoutAccess();
  const {
    printOrder,
    downloadOrder,
    isLoading: isPrintLoading,
    error,
    clearError,
  } = usePrintOrder({
    deliveryMethod,
    deliveryCost: deliveryPrice,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const totalPrice = getTotalPrice();
  const finalPrice = totalPrice + deliveryPrice;

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6 py-4 lg:py-6 border-2 border-gray-300 rounded-lg bg-white">
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

      <h2 className="text-xl font-semibold mb-2">Ваш заказ</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Итого:</span>
          <span className="font-semibold text-end">{formatPrice(totalPrice)} ₽</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Стоимость доставки:</span>
          <span className="font-semibold text-end">
            {deliveryPrice === 0 ? 'Бесплатно' : `${formatPrice(deliveryPrice)} ₽`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Способ оказания услуги:</span>
          <span className="font-semibold text-end">{deliveryTypes[deliveryMethod]}</span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Сумма к оплате:</span>
            <span className="font-bold text-xl text-end">{formatPrice(finalPrice)} ₽</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            checked={agreedToTerms}
            id="terms"
            onCheckedChange={checked => setAgreedToTerms(checked === true)}
          />
          <label className="text-sm text-gray-600 leading-relaxed cursor-pointer" htmlFor="terms">
            Я согласен с условиями{' '}
            <a className="text-[#3DA000] hover:underline" href="#">
              политики конфиденциальности
            </a>{' '}
            и{' '}
            <a className="text-[#3DA000] hover:underline" href="#">
              правилами продажи
            </a>
            .
          </label>
        </div>

        <Button
          className="w-full"
          disabled={!agreedToTerms || !isFormValid || isLoading}
          onClick={onPaymentAction}
          size="lg"
        >
          {isLoading
            ? 'Создание заказа...'
            : paymentMethod === 'online'
              ? 'Оплатить'
              : 'Оформить заказ'}
        </Button>

        <div className="flex gap-2">
          <Button
            className="flex-1 cursor-pointer"
            disabled={isPrintLoading || !hasItems}
            onClick={printOrder}
            variant="ghost"
          >
            <Image alt="printer" height={20} src="/icons/printer.svg" width={20} />
            <span className="text-gray-400">{isPrintLoading ? 'Печать...' : 'Распечатать'}</span>
          </Button>

          <Button
            className="flex-1 cursor-pointer"
            disabled={isPrintLoading || !hasItems}
            onClick={downloadOrder}
            variant="ghost"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <span className="text-gray-400">{isPrintLoading ? 'Скачивание...' : 'Скачать'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
