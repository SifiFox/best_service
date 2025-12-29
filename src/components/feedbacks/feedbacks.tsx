'use client';

import { Heading } from '@radix-ui/themes';
import { useCallback, useEffect, useState } from 'react';

import StarRating from '@/shared/star-rating/star-rating';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const feedbacks = [
  {
    id: 1,
    name: 'Александра',
    rating: 4,
    avatar: '/images/avatar.png',
    comment:
      'Отличная работа! Мастер приехал вовремя, быстро диагностировал проблему со стиральной машиной и устранил её прямо на месте. Теперь всё работает идеально',
  },
  {
    id: 2,
    name: 'Иван',
    rating: 5,
    avatar: '/images/avatar2.png',
    comment:
      'Спасибо за оперативность! Нужен был срочный ремонт ноутбука, мастер приехал через час после звонка и буквально спас мой рабочий день. Всё сделано аккуратно и профессионально',
  },
  {
    id: 3,
    name: 'Екатерина',
    rating: 3,
    avatar: '/images/avatar3.png',
    comment:
      'Долго искали хорошего специалиста по ремонту холодильника. Ваши мастера оказались настоящими профи! Быстро нашли причину поломки и отремонтировали технику. Очень довольны результатом',
  },
  {
    id: 4,
    name: 'Ольга',
    rating: 4,
    avatar: '/images/avatar4.png',
    comment:
      'Не первый раз пользуюсь услугами вашей компании. Всегда приятно удивляют скорость работы и качество ремонта. Спасибо за помощь',
  },
  {
    id: 5,
    name: 'Марина',
    rating: 5,
    avatar: '/images/avatar5.png',
    comment: 'Очень приятно работать с профессионалами! Все четко, быстро и качественно. Спасибо!',
  },
  {
    id: 6,
    name: 'Татьяна',
    rating: 3,
    avatar: '/images/avatar6.png',
    comment:
      'Все прошло идеально! Очень внимательные сотрудники и высокое качество работы. Спасибо!',
  },
  {
    id: 7,
    name: 'Виктор',
    rating: 3,
    avatar: '/images/avatar7.png',
    comment:
      'Хороший опыт сотрудничества. Есть небольшие пожелания по улучшению, но в целом все отлично.',
  },
];

export default function Feedbacks() {
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
    <div className="flex flex-col gap-3 px-4 lg:px-12 py-10">
      <Heading className="text-xl sm:text-2xl md:text-3xl">Отзывы 4</Heading>
      <StarRating
        className="hidden md:flex"
        size={{
          base: 16,
          sm: 18,
          md: 20,
          lg: 24,
        }}
        titleSize={{
          base: '6',
          sm: '7',
          md: '8',
          lg: '9',
        }}
      />
      <div className="mx-auto w-full sm:w-[90%] md:w-[100%]">
        <Carousel
          className="min-h-[200px] w-full sm:min-h-[220px] md:min-h-[240px]"
          opts={{
            slidesToScroll: 1,
            align: 'start',
          }}
        >
          <div className="absolute right-0 -top-7 z-10 flex gap-2 sm:gap-3">
            <CarouselPrevious
              className="static rounded-lg border px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3"
              variant="white"
            />
            <CarouselNext
              className="static rounded-lg border px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3"
              variant="white"
            />
          </div>
          <CarouselContent className="-ml-2 h-full sm:-ml-4">
            {feedbacks.map(feedback => (
              <CarouselItem
                className="min-w-0 basis-full pl-2 first:ml-0 sm:basis-[50%] sm:pl-4 md:basis-[40%] lg:basis-[30%]"
                key={feedback.id}
              >
                <div className="h-full rounded-lg bg-gray-100 p-3 sm:p-4 md:p-6">
                  <div className="h-full flex flex-col gap-2 sm:gap-3 md:gap-4">
                    <Heading className="text-base sm:text-lg md:text-xl">{feedback.name}</Heading>
                    <StarRating
                      defaultRating={feedback.rating}
                      size={{
                        base: 12,
                        sm: 14,
                        md: 16,
                        lg: 24,
                      }}
                    />
                    <p className="line-clamp-4 text-sm sm:line-clamp-5 sm:text-base">
                      {feedback.comment}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
