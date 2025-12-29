'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4">
      {navbarItems.map(item => (
        <NavbarItem href={item.href} isActive={isActiveRoute(pathname, item.href)} key={item.href}>
          {item.label}
        </NavbarItem>
      ))}
    </nav>
  );
}

function NavbarItem({
  children,
  href,
  isActive,
}: {
  children: ReactNode;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link
      className={cn(
        'rounded-full border-1 border-white text-white text-sm px-4 py-2 hover:bg-gray-100 hover:text-black transition-colors',
        isActive && 'bg-primary border-none text-white hover:bg-primary/90 hover:text-white'
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(href);
}

const navbarItems = [
  {
    label: 'Главная',
    href: '/',
  },
  {
    label: 'Услуги',
    href: '/services',
  },
  {
    label: 'Акции',
    href: '/promotion',
  },
  {
    label: 'Контакты',
    href: '/contacts',
  },
];
