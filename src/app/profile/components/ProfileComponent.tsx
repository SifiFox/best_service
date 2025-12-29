'use client';

import dynamic from 'next/dynamic';

const IAm = dynamic(() => import('@/components/profile/tabs-content/i-am'));
const Notifications = dynamic(() => import('@/components/profile/tabs-content/notifications'));
const Orders = dynamic(() => import('@/components/profile/tabs-content/orders'));

import { OrderIcon, PersonIcon } from '@/components/ui/profile-icons';
import { Tabs, TabsContent, TabsList, TabsSeparator, TabsTrigger } from '@/components/ui/tabs';

import { LogoutButton } from '@/auth/nextjs/components/logout-button';

export default function ProfileComponent() {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 px-4 py-4 lg:mb-10 lg:flex-row lg:gap-8 lg:px-12">
      <Tabs className="w-full" defaultValue="orders">
        <div className="border-y-border flex w-full justify-center border-y py-2 sm:py-4">
          <TabsList className="relative mx-auto flex w-full max-w-full justify-center gap-0 sm:max-w-[70%] lg:max-w-[40%] 2xl:min-w-6xl">
            <TabsTrigger
              className="flex-col gap-1 px-1 py-2 sm:flex-row sm:gap-2 sm:px-2 sm:py-1"
              value="i-am"
            >
              <PersonIcon className="sm:size-[25px]" size={20} />
              <span className="text-xs sm:text-xl">Профиль</span>
            </TabsTrigger>
            <TabsSeparator className="h-[45px]" />
            <TabsTrigger
              className="flex-col gap-1 px-1 py-2 sm:flex-row sm:gap-2 sm:px-2 sm:py-1"
              value="orders"
            >
              <OrderIcon className="sm:size-[25px]" size={20} />
              <span className="text-xs sm:text-xl">Заказы</span>
            </TabsTrigger>
            <TabsSeparator className="h-[45px]" />
            {/* <TabsTrigger
              className="flex-col gap-1 px-1 py-2 sm:flex-row sm:gap-2 sm:px-2 sm:py-1"
              value="notifications"
            >
              <NotificationIcon className="sm:size-[25px]" size={20} />
              <span className="text-xs sm:text-xl">Уведомления</span>
            </TabsTrigger> */}
            <TabsSeparator className="h-[45px]" />
            <LogoutButton />
          </TabsList>
        </div>

        <TabsContent value="i-am">
          <IAm />
        </TabsContent>
        <TabsContent value="orders">
          <Orders />
        </TabsContent>
        <TabsContent value="notifications">
          <Notifications />
        </TabsContent>
      </Tabs>
    </div>
  );
}
