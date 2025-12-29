import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';

import CheckoutComponent from './components/CheckoutComponent';
import { getQueryClient } from '../get-query-client';

export default async function CheckoutPage() {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen flex flex-col w-full">
        <CheckoutComponent />
      </div>
    </HydrationBoundary>
  );
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
