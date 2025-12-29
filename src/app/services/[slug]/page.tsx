import { Section } from '@radix-ui/themes';
import { Box } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import Image from 'next/image';

import Feedbacks from '@/components/feedbacks/feedbacks.tsx';
import FormAsk from '@/components/forms/form-ask/form-ask';
import FormMain from '@/components/forms/form-main/form-main';
import ServiceBreadcrumbServer from '@/components/ui/service-breadcrumb-server';

import { serviceApi } from '@/entities/service/api/service-api';
import { BreadcrumbsJsonLd } from '@/seo/breadcrumbs';
import { getCategoryMetadata } from '@/seo/pages';
import TitleWithSearch from '@/widgets/title-with-search/title-with-search';

import ServiceList from './components/ServiceList';
import { getQueryClient } from '../../get-query-client';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  // Преобразуем slug в typeId (предполагаем, что slug это ID типа)
  const typeId = parseInt(slug, 10);

  // Получаем название категории
  let categoryName = '';
  let categoryImg = null;
  try {
    const groupedServices = await serviceApi.getGroupedServices();
    // Ищем категорию по ID в группированных сервисах
    const categoryId = parseInt(slug, 10);
    let foundCategory = null;
    for (const department of groupedServices) {
      const category = department.type.find(cat => cat.id === categoryId);
      if (category) {
        foundCategory = category;
        break;
      }
    }

    categoryName = foundCategory?.name || slug;
    categoryImg = foundCategory?.img_header || '/images/service-placeholder.png';
  } catch {
    categoryName = slug;
  }

  // Предзагрузка данных для услуг в данной категории
  await queryClient.prefetchQuery({
    queryKey: ['services', typeId],
    queryFn: () => serviceApi.getServicesByCategory(typeId),
  });

  return (
    <div className="flex w-full flex-col">
      <div className="relative mb-4 py-0 md:mb-10 md:py-10 lg:h-[525px]">
        <div className="absolute top-0 left-0 -z-10 hidden h-[525px] w-full overflow-hidden md:block">
          <Image
            alt={`Фон категории услуг: ${categoryName || slug}`}
            className="object-cover"
            fill
            priority={false}
            sizes="(min-width: 1024px) 100vw, 100vw"
            src={categoryImg || '/images/service-placeholder.png'}
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between">
          <ServiceBreadcrumbServer categorySlug={slug} currentPath={`/services/${slug}`} />
          <BreadcrumbsJsonLd
            items={[
              { name: 'Главная', path: '/' },
              { name: 'Услуги', path: '/services' },
              { name: categoryName || slug, path: `/services/${slug}` },
            ]}
          />
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="mb-6 flex w-full flex-col px-4 lg:mb-20 lg:px-12">
          <TitleWithSearch
            badgeTitle="Услуги"
            department={categoryName}
            departmentName={categoryName}
            moveToAllServicesVisible
          />
          <div className="flex flex-col gap-8 lg:flex-row">
            <ServiceList typeId={typeId} />
            <div className="sticky top-40 h-fit min-w-[300px] xl:min-w-[400px] 2xl:min-w-[586px]">
              <FormAsk />
            </div>
          </div>
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const typeId = parseInt(slug, 10);
  return getCategoryMetadata(typeId);
}
