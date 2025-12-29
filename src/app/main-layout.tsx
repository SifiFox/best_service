'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <main
      className={cn(
        'flex w-full flex-1 flex-col items-center',
        !isHomePage && 'pt-20 lg:pt-[130px]'
      )}
    >
      {children}
    </main>
  );
}
