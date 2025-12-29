'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

import { oswaldStyle } from '@/lib/utils';

import { FavouritesItemsCount } from '@/components/cart';
import FormAsk from '@/components/forms/form-ask/form-ask';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useFavouritesStore } from '@/stores/favourites-store';

export default function FavouritesComponent() {
  const { items, clearFavourites, removeItem } = useFavouritesStore();
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 px-4 py-4 lg:mb-10 lg:flex-row lg:gap-8 lg:px-12">
      <div className="flex w-full flex-col">
        <div className="mb-4 flex w-full justify-between gap-3 sm:mb-6 sm:gap-4 lg:mb-8">
          <div className="xs:flex-row xs:items-baseline xs:gap-2 flex flex-col gap-1 sm:gap-3">
            <h1
              className="text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl xl:text-5xl"
              style={oswaldStyle}
            >
              Избранное
            </h1>
            <FavouritesItemsCount />
          </div>
          <Button
            className="flex w-fit items-center gap-1 self-start px-2 py-1 !text-sm !text-black transition-colors hover:bg-gray-100 sm:gap-2 sm:self-auto sm:px-3 sm:py-2 sm:!text-base lg:px-4 lg:!text-lg xl:!text-xl"
            onClick={clearFavourites}
            variant="ghost"
          >
            <span className="whitespace-nowrap">Очистить</span>
            <span className="text-base text-gray-400 sm:text-lg lg:text-xl">✕</span>
          </Button>
        </div>
        <div className="flex h-auto flex-col gap-3 sm:gap-4">
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-lg text-gray-500">Избранное пусто</p>
            </div>
          ) : (
            items.map(item => (
              <div
                className="flex flex-col justify-between gap-4 rounded-lg border-2 border-gray-200 px-3 py-3 transition-colors hover:border-gray-300 sm:flex-row sm:gap-6 sm:px-4 sm:py-4 xl:px-8 xl:py-8"
                key={item.id}
              >
                <Link
                  className="flex w-full flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  href={`/services/${item.slug}/${item.id}`}
                >
                  <div className="flex items-center gap-3 sm:gap-6">
                    <div className="relative flex h-16 w-16 flex-shrink-0 items-center gap-2 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                      {item.img && (
                        <Image alt="service" className="object-contain" fill src={item.img} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="line-clamp-2 text-lg font-semibold transition-colors hover:text-[#3DA000] sm:line-clamp-1 sm:text-xl lg:text-2xl">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-xl font-semibold sm:text-2xl" style={oswaldStyle}>
                    {item.price} ₽
                  </p>
                </Link>
                <div className="flex flex-row items-center justify-end gap-4 sm:flex-col sm:items-end sm:gap-6 lg:justify-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="relative aspect-square size-10 w-fit flex-shrink-0 rounded-lg border-2 border-primary/60 bg-primary/20 p-0 hover:bg-white xl:size-15"
                        onClick={e => {
                          e.preventDefault();
                          removeItem(item.id);
                          toast.success('Товар удален из избранного!', {
                            position: 'bottom-center',
                            duration: 2000,
                          });
                        }}
                        type="button"
                      >
                        <Image
                          alt="remove from favourites"
                          className="p-2 lg:p-3"
                          fill
                          src="/icons/favourites.svg"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Удалить из избранного</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <aside className="sticky top-4 mt-4 flex h-fit w-full flex-col gap-4 lg:top-[150px] lg:mt-33 lg:max-w-[400px]">
        <FormAsk />
      </aside>
      <Toaster />
    </div>
  );
}
