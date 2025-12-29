'use client';

import dynamic from 'next/dynamic';

import { oswaldStyle } from '@/lib/utils';

import { useCartStore } from '@/stores/cart-store';

const CartBadgeComponent = ({ count }: { count: number }) => {
  if (count === 0) return null;

  return (
    <span
      className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
      style={oswaldStyle}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};

export const CartBadge = dynamic(
  () =>
    Promise.resolve(() => {
      const { getTotalItems } = useCartStore();
      const totalItems = getTotalItems();
      return <CartBadgeComponent count={totalItems} />;
    }),
  {
    ssr: false,
    loading: () => null,
  }
);
