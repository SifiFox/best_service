'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX, SVGProps, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { CartBadge } from '@/components/cart';
import ModalMaster from '@/components/modals/modal-master';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import Location from '@/shared/location/location';
import Logo from '@/shared/logo';

import Navbar from './navbar';

export default function Header() {
  const [masterModalState, setMasterModalState] = useState({ isOpen: false });
  const headerRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry && headerRef.current) {
          headerRef.current.dataset.scrolled = (!entry.isIntersecting).toString();
        }
      },
      { threshold: 0 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMasterClose = () => {
    setMasterModalState({ isOpen: false });
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 h-8 w-full"
        ref={sentinelRef}
      />
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-colors duration-300',
          'shadow-md lg:shadow-none',
          'bg-gradient-to-b from-black to-black lg:to-transparent',
          'data-[scrolled=true]:bg-black',
          !isHomePage && 'bg-black'
        )}
        ref={headerRef}
      >
        <div className="flex w-full items-center justify-between p-2 lg:hidden">
          <Link href="/">
            <img alt="Logo" className="size-10 cursor-pointer" src="/images/logo.png" />
          </Link>
          <div className="flex w-full items-center justify-end gap-2 text-white">
            <div className="flex items-center gap-1">
              <Image
                alt="Телефон"
                className="brightness-0 invert"
                height={15}
                src="/icons/phone.svg"
                width={15}
              />
              <Link className="text-sm font-medium" href="tel:+74956003185">
                +7 (495) 600-31-85
              </Link>
            </div>
            <Link className="contents" href="/profile">
              <Button className="relative w-fit p-0 hover:bg-transparent" variant="ghost">
                <Image alt="user" height={26} src="/images/user-placeholder.png" width={26} />
              </Button>
            </Link>
            <Location className="text-white" view="header" />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="text-white hover:bg-transparent hover:text-white lg:hidden"
                  size="icon"
                  variant="ghost"
                >
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                className="w-full border-zinc-800 bg-zinc-900 p-0 text-white"
                side="left"
              >
                <div className="sr-only">
                  <DialogTitle>Меню навигации</DialogTitle>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 p-2 shadow-md">
                  <Link href="/">
                    <Logo className="h-[25px] w-[69px] cursor-pointer brightness-0 invert" />
                  </Link>
                  <div className="mr-10 flex items-center gap-2">
                    <Link className="contents" href="/profile">
                      <Button className="relative w-fit p-0 hover:bg-transparent" variant="ghost">
                        <Image
                          alt="user"
                          height={26}
                          src="/images/user-placeholder.png"
                          width={26}
                        />
                      </Button>
                    </Link>
                    <Location view="header" />
                  </div>
                </div>
                <Link className="mr-6 hidden lg:flex" href="#" prefetch={false}>
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <div className="grid gap-2 px-4 py-6">
                  <Link
                    className="flex w-full items-center py-2 text-lg font-semibold hover:text-zinc-300"
                    href="#"
                    prefetch={false}
                  >
                    Акции
                  </Link>
                  <Link
                    className="flex w-full items-center py-2 text-lg font-semibold hover:text-zinc-300"
                    href="#"
                    prefetch={false}
                  >
                    Контакты
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="hidden h-full w-full flex-col px-12 py-5 lg:flex">
          <div className="flex w-full items-center justify-between gap-5">
            <Link
              className="block flex h-[90px] min-w-[180px] cursor-pointer items-center"
              href="/"
            >
              <Logo className="h-full w-full" />
            </Link>
            <Navbar />
            <div className="flex items-center gap-4">
              <Location view="default" />
              <Button
                className="px-8 py-6 leading-none text-black"
                onClick={() => setMasterModalState({ isOpen: true })}
                variant="default"
              >
                Бесплатная консультация
              </Button>
              <div className="relative flex flex-row items-end gap-2">
                <Link className="contents" href="/cart">
                  <span className="bg-primary relative inline-flex aspect-square w-fit cursor-pointer justify-center rounded-full p-1.5 hover:bg-gray-200">
                    <Image
                      alt="cart"
                      className="md:h-[25px] md:w-[18px]"
                      height={20}
                      src="/icons/cart.svg"
                      width={16}
                    />
                    <CartBadge />
                  </span>
                </Link>
                <Link className="contents" href="/profile">
                  <span className="bg-primary relative inline-flex aspect-square w-fit cursor-pointer justify-center rounded-full p-1.5 hover:bg-gray-200">
                    <Image alt="user" height={26} src="/images/user-placeholder.png" width={26} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ModalMaster modalState={masterModalState} onClose={handleMasterClose} />
      </header>
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
