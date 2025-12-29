'use client';

import { usePathname } from 'next/navigation';

import HeaderCatalog from './header-catalog';

export default function ConditionalHeaderCatalog() {
  const pathname = usePathname();
  if (pathname === '/') {
    return <HeaderCatalog />;
  }

  return null;
}
