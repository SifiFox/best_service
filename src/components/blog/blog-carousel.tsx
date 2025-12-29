'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { rfDewiFont } from '@/app/fonts';
import { BLOG_POSTS } from '@/entities/blog/data';

import { BlogCard } from './blog-card';

export default function BlogCarousel() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isClient, setIsClient] = useState(false);

  const getItemsPerPage = useCallback(() => {
    if (!isClient) return 3;

    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateItemsPerPage = () => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [itemsPerPage, isClient, getItemsPerPage]);

  return (
    <div className="flex flex-col gap-3 px-4 py-10 lg:px-12">
      <p className={`${rfDewiFont.className} mb-15 text-xl sm:text-2xl md:text-3xl`}>
        БЛОГ - ПОЛЕЗНЫЕ СОВЕТЫ <br /> И РЕКОМЕНДАЦИИ ПО УХОДУ ЗА ТЕХНИКОЙ.
      </p>

      <div className="mx-auto w-full sm:w-[90%] md:w-[100%]">
        <Carousel
          className="min-h-[200px] w-full sm:min-h-[220px] md:min-h-[240px]"
          opts={{
            slidesToScroll: 1,
            align: 'start',
          }}
        >
          <div className="absolute -top-10 right-0 z-10 flex gap-2 sm:-top-10 sm:gap-3">
            <CarouselPrevious
              className="static h-8 w-8 rounded-lg border p-0 sm:h-auto sm:w-auto sm:px-5 sm:py-3 md:px-6 md:py-3"
              variant="white"
            />
            <CarouselNext
              className="static h-8 w-8 rounded-lg border p-0 sm:h-auto sm:w-auto sm:px-5 sm:py-3 md:px-6 md:py-3"
              variant="white"
            />
          </div>
          <CarouselContent className="-ml-2 h-full sm:-ml-4">
            {BLOG_POSTS.map(post => (
              <CarouselItem
                className="min-w-0 basis-full pl-2 first:ml-0 sm:basis-[50%] sm:pl-4 md:basis-[40%] lg:basis-[30%]"
                key={post.id}
              >
                <BlogCard post={post} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
