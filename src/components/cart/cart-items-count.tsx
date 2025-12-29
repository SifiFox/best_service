'use client';

import dynamic from 'next/dynamic';

import { oswaldStyle } from '@/lib/utils';

import { useCartStore } from '@/stores/cart-store';

const CartItemsCountComponent = () => {
  const { items } = useCartStore();

  return (
    <span className="text-gray-400 text-sm sm:text-base lg:text-lg whitespace-nowrap">
      {items.length} товара
    </span>
  );
};

const CartItemsCountLoading = () => (
  <span
    className="text-gray-400 text-sm sm:text-base lg:text-lg whitespace-nowrap"
    style={oswaldStyle}
  >
    0 товаров
  </span>
);

export const CartItemsCount = dynamic(() => Promise.resolve(CartItemsCountComponent), {
  ssr: false,
  loading: () => <CartItemsCountLoading />,
});
