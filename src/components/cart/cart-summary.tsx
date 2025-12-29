'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

import { formatPrice } from '@/lib/utils';
import { useCheckoutAccess } from '@/hooks/use-checkout-access';

import { Button } from '@/components/ui/button';

import { useCartStore } from '@/stores/cart-store';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const CartSummaryComponent = () => {
  const { getTotalItems, getTotalPrice } = useCartStore();
  const { navigateToCheckout, hasItems } = useCheckoutAccess();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    if (!hasItems) {
      toast.error('Корзина пуста');
      return;
    }
    navigateToCheckout();
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-gray-300 px-4 py-4 lg:px-6 lg:py-6">
      <div className="flex justify-between gap-6">
        <h5 className="text-xl font-semibold">{totalItems} ТОВАРА НА СУММУ:</h5>
        <p className="text-xl font-bold">{formatPrice(totalPrice)} ₽</p>
      </div>
      <div className="flex justify-between gap-6">
        <h5 className="text-xl font-semibold">Ближайшая дата вызова мастера:</h5>
        <p className="text-xl font-bold">{tomorrow.toLocaleDateString('ru-RU')}</p>
      </div>
      <div className="flex justify-between gap-6 border-t border-gray-200 pt-4">
        <h5 className="text-2xl font-semibold">Итого:</h5>
        <p className="text-2xl font-bold">{formatPrice(totalPrice)} ₽</p>
      </div>
      <Button className="w-full" disabled={!hasItems} onClick={handleCheckout} size="xl">
        Оформить заказ
      </Button>
    </div>
  );
};

const CartSummaryLoading = () => (
  <div className="flex flex-col gap-4 rounded-lg border-2 border-gray-300 px-4 py-4 lg:px-6 lg:py-6">
    <div className="flex justify-between gap-6">
      <h5 className="text-xl font-semibold">0 ТОВАРА НА СУММУ:</h5>
      <p className="text-xl font-bold">0 ₽</p>
    </div>
    <div className="flex justify-between gap-6">
      <h5 className="text-xl font-semibold">Ближайшая дата вызова мастера:</h5>
      <p className="text-xl font-bold">{tomorrow.toLocaleDateString('ru-RU')}</p>
    </div>
    <div className="flex justify-between gap-6 border-t border-gray-200 pt-4">
      <h5 className="text-2xl font-semibold">Итого:</h5>
      <p className="text-2xl font-bold">0 ₽</p>
    </div>
    <Button className="w-full" size="xl">
      Оформить заказ
    </Button>
  </div>
);

export const CartSummary = dynamic(() => Promise.resolve(CartSummaryComponent), {
  ssr: false,
  loading: () => <CartSummaryLoading />,
});
