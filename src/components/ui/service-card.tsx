import Image from 'next/image';

import { ServiceTypeWithItems } from '@/shared/types/api';

import { Button } from './button';
import { Card } from './card';

export default function ServiceCard({ item }: { item: ServiceTypeWithItems }) {
  return (
    <Card className="relative flex aspect-[1/1.3] min-h-0 flex-col justify-between overflow-hidden border-none bg-gray-200/30 p-3 sm:p-4 lg:p-6 xl:p-8 2xl:p-10">
      <div className="absolute top-0 left-0 h-full w-full">
        <Image
          alt={item.name || 'image'}
          className="object-cover object-center"
          fill
          src={item.img || '/images/service-placeholder.png'}
        />
      </div>
      <div className="relative z-20 mt-auto flex items-end justify-end gap-2">
        <Button
          className="h-fit max-w-fit flex-shrink-0 cursor-pointer text-left text-xs leading-tight whitespace-pre-wrap text-white sm:text-sm lg:text-base xl:text-lg"
          variant="outline"
        >
          {item.name || 'Без названия'}
        </Button>
      </div>
    </Card>
  );
}
