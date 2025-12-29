import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { _getCurrentUser } from '@/auth/nextjs/current-user';

import ProfileComponent from './components/ProfileComponent';
import { getQueryClient } from '../get-query-client';

export default async function ProfilePage() {
  await _getCurrentUser({ redirectIfNotAuth: true });

  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex min-h-screen min-w-full flex-col">
        <ProfileComponent />
      </div>
    </HydrationBoundary>
  );
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
