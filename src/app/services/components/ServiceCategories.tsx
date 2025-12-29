'use client';

import { Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';

import ServiceCard from '@/components/ui/service-card';

import { useGroupedServices } from '@/entities/service/hooks/use-grouped-services';
import SectionTitle from '@/shared/section-title';
import TitleWithSearch from '@/widgets/title-with-search/title-with-search';

export default function ServiceCategories() {
  const searchParams = useSearchParams();
  const department = searchParams.get('department') || undefined;

  const { data: groupedServices, isLoading, error } = useGroupedServices({ department });

  if (isLoading) {
    return (
      <Flex className="mb-6 w-full sm:mb-8 md:mb-10" direction="column" gap="3 sm:gap-4 md:gap-5">
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
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-4xl font-bold text-primary">Ошибка загрузки</h1>
        <p className="text-gray-700">
          {error instanceof Error ? error.message : 'Произошла ошибка при загрузке услуг'}
        </p>
      </div>
    );
  }

  return (
    <Flex className="mb-6 w-full sm:mb-8 md:mb-10" direction="column" gap="3 sm:gap-4 md:gap-5">
      {groupedServices?.map(({ department, type }, categoryIndex) => (
        <Fragment key={categoryIndex}>
          {categoryIndex === 0 ? (
            <TitleWithSearch
              department={department.name}
              departmentName={department.name}
              moveToAllServicesVisible
              withBadge={false}
            />
          ) : (
            <SectionTitle
              className="mb-2 md:mb-4 lg:mb-20"
              title={department.name}
              withBadge={false}
            />
          )}

          <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-4 lg:mb-20 xl:grid-cols-4 xl:gap-8">
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
    </Flex>
  );
}
