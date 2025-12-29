import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';

import ServiceBreadcrumbServer from '@/components/ui/service-breadcrumb-server';

import { serviceApi } from '@/entities/service/api/service-api';
import { siteSeo } from '@/seo/config';

import ServiceDetailsComponent from './components/ServiceDetailsComponent';
import { getQueryClient } from '../../../../get-query-client';

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const queryClient = getQueryClient();

  // Предзагрузка данных для деталей услуги
  await queryClient.prefetchQuery({
    queryKey: ['serviceDetails', slug, id],
    queryFn: () => serviceApi.getServiceDetails(Number(id)),
  });

  return (
    <>
      <ServiceBreadcrumbServer
        categorySlug={slug}
        currentPath={`/services/${slug}/${id}/details`}
        serviceId={id}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ServiceDetailsComponent id={id} slug={slug} />
      </HydrationBoundary>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  try {
    const service = await serviceApi.getServiceDetails(Number(id));
    const title = service.name || `Услуга ${id}`;
    const description = service.description || 'Детали услуги и условия ремонта.';
    const url = `${siteSeo.siteUrl.replace(/\/$/, '')}/services/${slug}/${id}/details`;
    const image = service.img || siteSeo.defaultOgImage;
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
