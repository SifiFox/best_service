'use client';

import { TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

import { cn, oswaldStyle } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { QuantityControl } from '@/components/ui/quantity-control';
import { Skeleton } from '@/components/ui/skeleton';

import { useCartStore } from '@/stores/cart-store';

import { useService } from '@/entities/service';

export default function ServiceDetail({ slug, id }: { slug: string; id: string }) {
  const { data: service, isLoading, error } = useService(parseInt(id, 10));
  const { addItem, items: cartItems, updateQuantity, removeItem } = useCartStore();

  const isInCart = useMemo(() => {
    return cartItems.some(item => item.id === service?.id);
  }, [cartItems, service?.id]);

  const handleChangeQuantity = (quantity: number) => {
    updateQuantity(service?.id || 0, quantity);
  };

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6 lg:w-3/4">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col gap-4 rounded-xl border border-red-100 bg-red-50 p-6">
        <h3 className="text-xl font-bold text-red-600">Ошибка загрузки</h3>
        <p className="text-gray-700">
          {error instanceof Error ? error.message : 'Произошла ошибка при загрузке услуги'}
        </p>
        <Link href={`/services/${slug}`}>
          <Button className="bg-white" variant="outline">
            Назад к списку
          </Button>
        </Link>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex w-full flex-col gap-4 rounded-xl border border-yellow-100 bg-yellow-50 p-6">
        <h3 className="text-xl font-bold text-yellow-600">Услуга не найдена</h3>
        <Link href={`/services/${slug}`}>
          <Button className="bg-white" variant="outline">
            Назад к списку
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8 lg:w-3/4">
      {/* Главная карточка с ценой и действием */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-2">
            <h1
              className={cn(
                'text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl',
                oswaldStyle.fontFamily
              )}
              style={oswaldStyle}
            >
              {service.name}
            </h1>
            <p className="text-lg text-gray-600">
              {service.price ? (
                <span className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary md:text-4xl">
                    {service.price} ₽
                  </span>
                  <span className="text-sm text-gray-400">/ услуга</span>
                </span>
              ) : (
                <span className="text-2xl font-bold text-primary">Цена по запросу</span>
              )}
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 lg:w-auto lg:min-w-[300px]">
            {isInCart ? (
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-2">
                <QuantityControl
                  className="bg-white"
                  onQuantityChange={handleChangeQuantity}
                  quantity={cartItems.find(item => item.id === service.id)?.quantity || 1}
                />
                <Button
                  className="h-10 w-10 shrink-0 rounded-lg"
                  onClick={e => {
                    e.preventDefault();
                    removeItem(service.id);
                  }}
                  size="icon"
                  variant="destructive"
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                className="h-14 w-full text-lg font-semibold"
                onClick={() => {
                  addItem({
                    id: service.id,
                    img: service.img || '',
                    title: service.name || '',
                    price: Number(service.price) || 0,
                  });
                }}
              >
                Добавить в заказ
              </Button>
            )}
            <p className="text-center text-xs text-gray-400">
              Минимальная стоимость работ {Number(service.price) || 500} ₽
            </p>
          </div>
        </div>
      </div>

      {/* Описание услуги */}
      <div className="flex flex-col gap-6">
        <div className="prose prose-lg max-w-none rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-900 md:text-2xl" style={oswaldStyle}>
            Описание услуги
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {service.description ||
              'Подробное описание услуги временно отсутствует. Наши специалисты проконсультируют вас по всем вопросам при оформлении заявки.'}
          </p>
        </div>
      </div>
    </div>
  );
}
