import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';

import FavouritesComponent from './components/FavouritesComponent';
import { getQueryClient } from '../get-query-client';

export default async function ServicesPage() {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen flex flex-col">
        <FavouritesComponent />
      </div>
    </HydrationBoundary>
  );
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
