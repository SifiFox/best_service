import { Box, Flex, Section } from '@radix-ui/themes';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import Image from 'next/image';

import Feedbacks from '@/components/feedbacks/feedbacks.tsx';
import FormMain from '@/components/forms/form-main/form-main';
import ServicesFilters from '@/components/services-filters/services-filters';
import ServiceBreadcrumbServer from '@/components/ui/service-breadcrumb-server';

import { serviceApi } from '@/entities/service/api/service-api';
import { siteSeo } from '@/seo/config';
import { getServicesListMetadata } from '@/seo/pages';

import ServiceCategories from './components/ServiceCategories';
import { getQueryClient } from '../get-query-client';

type ServicesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const queryClient = getQueryClient();

  // Получаем параметр department из URL
  const resolvedSearchParams = await searchParams;
  const department =
    typeof resolvedSearchParams.department === 'string'
      ? resolvedSearchParams.department
      : undefined;

  // Предзагрузка данных для группированных сервисов с учетом фильтра
  await queryClient.prefetchQuery({
    queryKey: ['groupedServices', { department }],
    queryFn: () => serviceApi.getGroupedServices({ department }),
  });

  return (
    <div className="flex flex-col max-w-[100vw]">
      <div className="relative mb-4 py-0 md:mb-10 md:py-10 lg:h-[525px]">
        <div className="absolute top-0 left-0 -z-10 hidden h-[525px] w-full overflow-hidden md:block">
          <Image
            alt="Фон страницы каталога услуг"
            className="object-cover"
            fill
            priority={false}
            sizes="(min-width: 1024px) 100vw, 100vw"
            src="/images/service-placeholder.png"
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between">
          <ServiceBreadcrumbServer currentPath="/services" />
          <ServicesFilters />
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex w-full flex-col gap-8 px-4 lg:flex-row lg:px-12">
          <ServiceCategories />
        </div>
        <Section className="px-2 px-4 lg:px-12">
          <Box className="max-w-[100vw]">
            <Feedbacks />
          </Box>
        </Section>
        <Section className="px-2 px-4 lg:px-12">
          <Box>
            <Flex direction="column">
              <FormMain />
            </Flex>
          </Box>
        </Section>
      </HydrationBoundary>
    </div>
  );
}

export function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Metadata | Promise<Metadata> {
  return (async () => {
    const resolved = await searchParams;
    const department = typeof resolved.department === 'string' ? resolved.department : undefined;
    if (!department) return getServicesListMetadata();
    const title = `Услуги — ${department}`;
    const url = `${siteSeo.siteUrl.replace(/\/$/, '')}/services?department=${encodeURIComponent(
      department
    )}`;
    return {
      title,
      alternates: { canonical: url },
      openGraph: {
        title,
        url,
        images: [{ url: siteSeo.defaultOgImage }],
        type: 'website',
        siteName: siteSeo.siteName,
        locale: siteSeo.locale,
      },
    } satisfies Metadata;
  })();
}
