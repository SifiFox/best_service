'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

import { useGroupedServices } from '@/entities/service';
import SectionTitle from '@/shared/section-title';

import { Search } from '../search/search';

export default function TitleWithSearch({
  department,
  departmentName,
  badgeTitle,
  moveToAllServicesVisible = true,
  withBadge = true,
}: {
  department: string;
  departmentName: string;
  badgeTitle?: string;
  moveToAllServicesVisible?: boolean;
  withBadge?: boolean;
}) {
  const { data: groupedServices } = useGroupedServices({ department });
  const allServices = useMemo(() => {
    if (!groupedServices) return [];

    return groupedServices.flatMap(({ department, type }) =>
      type.flatMap(serviceType =>
        serviceType.items.map(service => ({
          value: `${serviceType.id}/${service.id}`,
          label: service.name,
          department: department.name,
          serviceType: serviceType.name,
          href: `/services/${serviceType.id}/${service.id}`,
        }))
      )
    );
  }, [groupedServices]);
  const searchCommands = useMemo(() => {
    const commands = allServices.map(service => ({
      value: service.value,
      label: `${service.label} (${service.department} - ${service.serviceType})`,
    }));

    return commands;
  }, [allServices]);

  return (
    <div className="mt-4 mb-2 flex flex-col justify-between gap-4 md:mb-4 lg:mb-20 xl:mt-0 xl:flex-row">
      <SectionTitle
        badgeTitle={badgeTitle}
        className="order-2 xl:order-1"
        title={departmentName}
        withBadge={withBadge}
      />
      <div className="order-1 flex items-center gap-6 xl:order-2">
        <Search className="h-9 w-full xl:w-[457px]" commands={searchCommands} />
        {moveToAllServicesVisible && (
          <Link
            className="bg-gradient-primary flex items-center gap-2 rounded-full py-1 pr-1 pl-2 text-white"
            href="/services"
          >
            <span className="text-base whitespace-nowrap">Все услуги</span>
            <div className="rounded-full bg-white p-1">
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
