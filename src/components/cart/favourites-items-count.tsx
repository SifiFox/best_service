'use client';

import dynamic from 'next/dynamic';

import { oswaldStyle } from '@/lib/utils';

import { useFavouritesStore } from '@/stores/favourites-store';

const FavouritesItemsCountComponent = () => {
  const { items } = useFavouritesStore();

  return (
    <span
      className="text-gray-400 text-sm sm:text-base lg:text-lg whitespace-nowrap"
      style={oswaldStyle}
    >
      {items.length} товара
    </span>
  );
};

const FavouritesItemsCountLoading = () => (
  <span
    className="text-gray-400 text-sm sm:text-base lg:text-lg whitespace-nowrap"
    style={oswaldStyle}
  >
    0 товаров
  </span>
);

export const FavouritesItemsCount = dynamic(() => Promise.resolve(FavouritesItemsCountComponent), {
  ssr: false,
  loading: () => <FavouritesItemsCountLoading />,
});
