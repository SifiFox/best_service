'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { formatPrice, oswaldStyle } from '@/lib/utils';

import { CartItemsCount, CartSummary } from '@/components/cart';
import { Button } from '@/components/ui/button';
import { QuantityControl } from '@/components/ui/quantity-control';

import { useCartStore } from '@/stores/cart-store';

export default function CartComponent() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'access-denied') {
      toast.error('Доступ к оформлению заказа возможен только из корзины');
    }
  }, [searchParams]);
  return (
    <div className="mb-6 flex w-full flex-col justify-between gap-4 px-4 py-8 py-20 lg:mb-10 lg:flex-row lg:gap-8 lg:px-12">
      <div className="flex w-full flex-col">
        <div className="mb-4 flex w-full items-center justify-between gap-3 sm:mb-6 sm:gap-4 lg:mb-8">
          <div className="xs:items-baseline xs:gap-2 flex flex-row gap-1 sm:gap-3">
            <h1 className="text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
              Корзина
            </h1>
            <CartItemsCount />
          </div>
          <Button
            className="flex w-fit cursor-pointer items-center gap-1 self-start px-2 py-1 !text-sm !text-black transition-colors hover:bg-gray-100 sm:gap-2 sm:self-auto sm:px-3 sm:py-2 sm:!text-base lg:px-4 lg:!text-lg xl:!text-xl"
            onClick={clearCart}
            variant="ghost"
          >
            <span className="whitespace-nowrap">Очистить</span>
            <span className="text-base text-gray-400 sm:text-lg lg:text-xl">✕</span>
          </Button>
        </div>
        <div className="flex h-auto flex-col gap-3 sm:gap-4">
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-lg text-gray-500">Корзина пуста</p>
            </div>
          ) : (
            items.map(item => (
              <div
                className="flex flex-col justify-between gap-4 rounded-lg border-2 border-gray-200 px-3 py-3 sm:flex-row sm:gap-6 sm:px-4 sm:py-4 xl:px-8 xl:py-8"
                key={item.id}
              >
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div className="flex items-center gap-3 sm:gap-6">
                    <div className="relative flex h-16 w-16 flex-shrink-0 items-center gap-2 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                      {item.img && (
                        <Image alt="cart" className="object-contain" fill src={item.img} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="line-clamp-2 text-lg font-semibold sm:line-clamp-1 sm:text-xl lg:text-2xl">
                        {item.title}
                      </h2>
                      <div className="mt-1 text-sm text-gray-600 sm:text-base">
                        <QuantityControl
                          onQuantityChange={quantity => updateQuantity(item.id, quantity)}
                          quantity={item.quantity}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start sm:gap-6">
                    <Button
                      className="relative order-2 aspect-square h-8 w-8 w-fit flex-shrink-0 cursor-pointer p-0 sm:order-1 sm:h-10 sm:w-10 lg:h-15 lg:w-15"
                      onClick={e => {
                        e.preventDefault();
                        removeItem(item.id);
                      }}
                      type="button"
                      variant="gray"
                    >
                      <Image alt="cart" className="p-2 sm:p-3" fill src="/icons/cart_remove.svg" />
                    </Button>
                    <p
                      className="order-1 text-xl font-semibold sm:order-2 sm:text-2xl"
                      style={oswaldStyle}
                    >
                      {formatPrice(item.price)} ₽
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <aside className="sticky top-4 mt-4 flex h-fit w-full flex-col gap-4 lg:top-20 lg:mt-23 lg:max-w-[400px]">
        <CartSummary />
      </aside>
    </div>
  );
}
