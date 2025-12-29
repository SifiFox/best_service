'use client';

import dynamic from 'next/dynamic';

import { useFavouritesStore } from '@/stores/favourites-store';

const FavouritesBadgeComponent = ({ count }: { count: number }) => {
  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
      {count > 99 ? '99+' : count}
    </span>
  );
};

export const FavouritesBadge = dynamic(
  () =>
    Promise.resolve(() => {
      const { getTotalItems } = useFavouritesStore();
      const totalItems = getTotalItems();
      return <FavouritesBadgeComponent count={totalItems} />;
    }),
  {
    ssr: false,
    loading: () => null,
  }
);
