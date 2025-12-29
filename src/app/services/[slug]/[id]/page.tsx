import { Box, Flex, Section } from '@radix-ui/themes';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import Image from 'next/image';

import DownloadBanner from '@/components/download-banner/download-banner';
import FormAsk from '@/components/forms/form-ask/form-ask';
import FormMain from '@/components/forms/form-main/form-main';
import PopularQuestions from '@/components/popular-questions/popular-questions';
import ServiceBreadcrumbServer from '@/components/ui/service-breadcrumb-server';

import { serviceApi } from '@/entities/service/api/service-api';
import { siteSeo } from '@/seo/config';
import TitleWithSearch from '@/widgets/title-with-search/title-with-search';

import ServiceDetail from './components/ServiceDetail';
import { getQueryClient } from '../../../get-query-client';

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const queryClient = getQueryClient();

  const service = await queryClient.fetchQuery({
    queryKey: ['service', id],
    queryFn: () => serviceApi.getServiceById(parseInt(id, 10)),
  });

  return (
    <div className="flex w-full flex-col">
      <div className="relative mb-4 py-0 md:mb-10 md:py-10 lg:h-[525px]">
        <div className="absolute top-0 left-0 -z-10 hidden h-[525px] w-full overflow-hidden md:block">
          <Image
            alt="services-bg"
            className="object-cover"
            fill
            src={service.type.img_header || '/images/service-placeholder.png'}
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between">
          <ServiceBreadcrumbServer
            categorySlug={slug}
            currentPath={`/services/${slug}/${id}`}
            serviceId={id}
          />
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="mb-6 w-full px-4 lg:mb-20 lg:px-12">
          <TitleWithSearch
            badgeTitle="Услуги"
            department={service.name}
            departmentName={service.name}
            moveToAllServicesVisible
            withBadge={false}
          />
          <div className="flex flex-col gap-8 lg:flex-row">
            <ServiceDetail id={id} slug={slug} />
            <div className="sticky top-10 h-fit lg:min-w-[400px]">
              <FormAsk />
            </div>
          </div>
          <Section className="px-4 lg:px-12">
            <Box>
              <Flex direction="column">
                <PopularQuestions />
              </Flex>
            </Box>
          </Section>
          <Section>
            <Box>
              <Flex direction="column">
                <DownloadBanner />
              </Flex>
            </Box>
          </Section>
          <Section className="px-2 md:px-12">
            <Box>
              <Flex direction="column">
                <FormMain />
              </Flex>
            </Box>
          </Section>
        </div>
      </HydrationBoundary>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  try {
    const service = await serviceApi.getServiceById(parseInt(id, 10));
    const title = service.name || `Услуга ${id}`;
    const description = service.description || 'Детали услуги и условия ремонта.';
    const url = `${siteSeo.siteUrl.replace(/\/$/, '')}/services/${slug}/${id}`;
    const image = service.img || service.type?.img_header || siteSeo.defaultOgImage;
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        images: [{ url: image }],
        type: 'article',
        siteName: siteSeo.siteName,
        locale: siteSeo.locale,
      },
    } satisfies Metadata;
  } catch {
    return { title: `Услуга ${id}` } satisfies Metadata;
  }
}
