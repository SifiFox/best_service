'use client';

import { Button } from '@/components/ui/button';
import { LogoutIcon } from '@/components/ui/profile-icons';

import { logout } from '../actions';

export function LogoutButton() {
  return (
    <Button className="p-0" onClick={async () => await logout()} variant="ghost">
      <div className="flex cursor-pointer flex-col items-center gap-1 px-1 py-2 sm:flex-row sm:gap-2 sm:px-2 sm:py-1">
        <LogoutIcon className="text-foreground shrink-0" size={25} />
        <span className="text-foreground text-xs font-medium sm:text-xl">Выход</span>
      </div>
    </Button>
  );
}
