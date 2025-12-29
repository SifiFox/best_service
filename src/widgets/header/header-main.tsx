'use client';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { useGroupedServices } from '@/entities/service/hooks/use-grouped-services';

export default function HeaderMain() {
  const { data: groupedData, isLoading } = useGroupedServices();
  return (
    <nav className="ml-auto hidden gap-6 text-xs uppercase lg:flex xl:text-base">
      <Link
        className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        href="/promotion"
        prefetch={false}
      >
        Акции
      </Link>
      <Link
        className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        href="/contacts"
        prefetch={false}
      >
        Контакты
      </Link>
      <NavigationMenu>
        {isLoading ? (
          <div className="animate-pulse text-center">Загрузка...</div>
        ) : (
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>ВСЕ УСЛУГИ</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col gap-2 capitalize">
                {groupedData?.map(({ department }, categoryIndex) => (
                  <Link
                    className="rounded-md px-4 py-2 whitespace-nowrap hover:bg-gray-100"
                    href={`/services?department=${department.slug}`}
                    key={categoryIndex}
                  >
                    {department.name}
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}
      </NavigationMenu>
    </nav>
  );
}
