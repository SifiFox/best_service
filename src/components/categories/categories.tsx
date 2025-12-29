'use client';

import { Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { Fragment } from 'react';

import { useGroupedServices } from '@/entities/service';
import SectionTitle from '@/shared/section-title';

import ServiceCard from '../ui/service-card';

const MAX_SERVICES_PER_CATEGORY = 4;

export default function Categories() {
  const {
    data: groupedData,
    isLoading,
    error,
  } = useGroupedServices({
    limit: MAX_SERVICES_PER_CATEGORY,
  });

  if (isLoading) {
    return (
      <Flex className="mb-6 sm:mb-8 md:mb-10" direction="column" gap="3 sm:gap-4 md:gap-5">
        <div className="animate-pulse">
          <div className="mb-4 h-8 rounded bg-gray-200" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="aspect-square rounded bg-gray-200" key={index} />
            ))}
          </div>
        </div>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex className="mb-6 sm:mb-8 md:mb-10" direction="column" gap="3 sm:gap-4 md:gap-5">
        <div className="p-4 text-center">
          <Text color="red">Ошибка загрузки категорий: {error.message}</Text>
        </div>
      </Flex>
    );
  }

  if (!groupedData || groupedData?.length === 0 || !Array.isArray(groupedData)) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-col sm:mb-8 md:mb-10">
      {groupedData?.map(({ department, type }, categoryIndex) => (
        <Fragment key={categoryIndex}>
          <Link href={`/services?department=${department.slug}`}>
            <SectionTitle
              badgeTitle="услуги"
              className="mb-2 md:mb-4 lg:mb-6"
              title={department.name}
            />
          </Link>

          <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-4 lg:mb-12 xl:grid-cols-4 xl:gap-8">
            {type.map((item, itemIndex: number) => {
              return (
                <Link href={`/services/${item.id}`} key={itemIndex}>
                  <ServiceCard item={item} />
                </Link>
              );
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
