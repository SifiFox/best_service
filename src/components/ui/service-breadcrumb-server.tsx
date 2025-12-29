import Link from 'next/link';

import { cn } from '@/lib/utils';

import { serviceApi } from '@/entities/service/api/service-api';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';

type ServiceBreadcrumbServerProps = {
  categorySlug?: string;
  serviceId?: string;
  currentPath: string;
  serviceName?: string;
};

export default async function ServiceBreadcrumbServer({
  categorySlug,
  serviceId,
  currentPath,
  serviceName: providedServiceName,
}: ServiceBreadcrumbServerProps) {
  let categoryName = '';
  let serviceName = '';

  // Получаем данные категории, если нужно
  if (categorySlug) {
    try {
      const groupedServices = await serviceApi.getGroupedServices();

      // Ищем категорию по ID в группированных сервисах
      const categoryId = parseInt(categorySlug, 10);
      let foundCategory = null;

      for (const department of groupedServices) {
        const category = department.type.find(cat => cat.id === categoryId);
        if (category) {
          foundCategory = category;
          break;
        }
      }

      categoryName = foundCategory?.name || categorySlug;
    } catch {
      categoryName = categorySlug;
    }
  }

  // Получаем данные услуги, если нужно
  if (serviceId) {
    if (providedServiceName) {
      // Используем переданное название услуги
      serviceName = providedServiceName;
    } else {
      try {
        const serviceIdNum = parseInt(serviceId, 10);
        const service = await serviceApi.getServiceById(serviceIdNum);
        serviceName = service.name;
      } catch {
        serviceName = `Услуга ${serviceId}`;
      }
    }
  }

  // Определяем текущую страницу
  const isServicesMainPage = currentPath === '/services';
  const isCategoryPage = currentPath === `/services/${categorySlug}`;
  const isServicePage = currentPath === `/services/${categorySlug}/${serviceId}`;
  const isServiceDetailsPage = currentPath === `/services/${categorySlug}/${serviceId}/details`;

  return (
    <div className="w-fit self-start px-4 py-3 lg:px-12">
      <div
        className={cn('bg-secondary rounded-2xl py-1 pr-1', isServicesMainPage ? 'pl-4' : 'pl-4')}
      >
        <Breadcrumb>
          <BreadcrumbList className="text-sm">
            {/* Главная */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  className="px-2 py-1 text-gray-600 transition-colors hover:text-gray-900"
                  href="/"
                >
                  Главная
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>/</BreadcrumbSeparator>

            {/* Услуги */}
            <BreadcrumbItem>
              {isServicesMainPage ? (
                <BreadcrumbPage className="rounded-2xl bg-white px-4 py-2 font-medium text-gray-900">
                  Услуги
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    className="text-gray-600 transition-colors hover:text-gray-900"
                    href="/services"
                  >
                    Услуги
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {categorySlug && <BreadcrumbSeparator>/</BreadcrumbSeparator>}

            {/* Категория услуг */}
            {categorySlug && (
              <BreadcrumbItem>
                {isCategoryPage ? (
                  <BreadcrumbPage className="font-me rounded-2xl bg-white px-4 py-2 text-gray-900">
                    {categoryName}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      className="text-gray-600 transition-colors hover:text-gray-900"
                      href={`/services/${categorySlug}`}
                    >
                      {categoryName}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            )}

            {(isServicePage || isServiceDetailsPage) && (
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            )}

            {/* Конкретная услуга */}
            {serviceId && (isServicePage || isServiceDetailsPage) && (
              <BreadcrumbItem>
                {isServicePage ? (
                  <BreadcrumbPage className="rounded-2xl bg-white px-4 py-2 font-medium text-gray-900">
                    {serviceName}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      className="text-gray-600 transition-colors hover:text-gray-900"
                      href={`/services/${categorySlug}/${serviceId}`}
                    >
                      {serviceName}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            )}

            {/* Детали услуги */}
            {isServiceDetailsPage && (
              <>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="rounded-2xl bg-white px-4 py-2 font-medium text-gray-900">
                    Подробности
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
