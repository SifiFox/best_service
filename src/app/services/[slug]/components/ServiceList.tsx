'use client';

import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

import { oswaldStyle } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { QuantityControl } from '@/components/ui/quantity-control';
import { Skeleton } from '@/components/ui/skeleton';

import { useCartStore } from '@/stores/cart-store';

import { useServicesByCategory } from '@/entities/service';

export default function ServiceList({ typeId }: { typeId: number }) {
  const { data: services, isLoading, error } = useServicesByCategory(typeId);
  const { addItem, items: cartItems, updateQuantity, removeItem } = useCartStore();

  const isInCart = (serviceId: number) => {
    return cartItems.some(item => item.id === serviceId);
  };

  const handleChangeQuantity = (serviceId: number, quantity: number) => {
    updateQuantity(serviceId, quantity);
  };

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-4xl font-bold text-yellow-500">Услуги категории: {typeId}</h1>
        <div className="flex w-48 flex-col gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-4xl font-bold text-yellow-500">Ошибка загрузки</h1>
        <p className="text-gray-700">
          {error instanceof Error ? error.message : 'Произошла ошибка при загрузке услуг'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-6">
        {services?.map(service => (
          <Link
            className="flex flex-row justify-between gap-6 rounded-lg border-2 border-gray-200 px-4 py-2 xl:px-8 xl:py-8"
            href={`/services/${typeId}/${service.id}`}
            key={service.id}
            prefetch={false}
          >
            <div className="flex w-full flex-col items-start justify-between gap-6 lg:items-center xl:flex-row">
              <h2 className="text-base font-semibold lg:text-2xl">{service.name}</h2>
              <p className="text-lg font-semibold text-nowrap lg:text-2xl" style={oswaldStyle}>
                {service.price || 'Цена по запросу'}
              </p>
            </div>
            <div className="flex flex-col items-center justify-end gap-4 xl:flex-row">
              {isInCart(service.id) ? (
                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full text-sm sm:w-auto md:text-base xl:text-lg"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeItem(service.id);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                  <div
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <QuantityControl
                      onQuantityChange={quantity => handleChangeQuantity(service.id, quantity)}
                      quantity={cartItems.find(item => item.id === service.id)?.quantity || 1}
                    />
                  </div>
                </div>
              ) : (
                <Button
                  className="relative aspect-square size-10 w-fit flex-shrink-0 p-0 xl:size-15"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem({
                      id: service.id,
                      img: service.img || '/images/cart_item.jpg',
                      title: service.name,
                      price: service.price ? parseInt(service.price.replace(/\D/g, '')) : 0,
                    });
                  }}
                  type="button"
                >
                  <Image alt="cart" className="p-2 lg:p-3" fill src="/icons/cart_add.svg" />
                </Button>
              )}
            </div>
          </Link>
        ))}
        <Toaster />
        {!services?.length && <p className="text-gray-500">Услуг в данной категории не найдено</p>}
      </div>
    </div>
  );
}
