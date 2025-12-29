'use client';

import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { useGroupedServices } from '@/entities/service';

export const HeaderCatalog = () => {
  const { data: groupedData, isLoading, error } = useGroupedServices();

  if (isLoading) {
    return (
      <div className="hidden bg-[#F8F8FA] px-12 lg:block">
        <div className="flex justify-between gap-4 rounded-lg px-12 py-6 uppercase shadow-md">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className="h-6 w-[8vw] animate-pulse rounded bg-gray-200" key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="hidden bg-[#F8F8FA] px-12 lg:block">
      <div className="rounded-lg px-12 py-6 shadow-md">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            slidesToScroll: 1,
            breakpoints: {
              '(min-width: 768px)': {
                slidesToScroll: 2,
              },
              '(min-width: 1024px)': {
                slidesToScroll: 3,
              },
            },
          }}
        >
          <CarouselContent className="-ml-15 2xl:-ml-22">
            {groupedData?.map(item =>
              item.type.map(type => (
                <CarouselItem className="basis-auto pl-15 2xl:pl-22 select-none" key={type.id}>
                  <Link
                    className="block text-xs font-medium whitespace-nowrap uppercase xl:text-base"
                    href={`/services/${type.id}`}
                  >
                    {type.name}
                  </Link>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="-left-10" />
          <CarouselNext className="-right-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default HeaderCatalog;
