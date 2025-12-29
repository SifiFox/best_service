import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import CartComponent from './components/CartComponent';
import { getQueryClient } from '../get-query-client';

export default async function ServicesPage() {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <CartComponent />
      </Suspense>
    </HydrationBoundary>
  );
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
