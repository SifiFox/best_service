'use client';

import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';

import { useServiceDetails } from '@/entities/service';

export default function ServiceDetailsComponent({ slug, id }: { slug: string; id: string }) {
  const { data: details, isLoading, error } = useServiceDetails(Number(id));

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Skeleton className="mb-8 h-10 w-96" />

        <div className="max-w-2xl rounded-lg bg-white p-6 shadow-lg">
          <Skeleton className="mb-4 h-8 w-48" />

          <div className="space-y-6">
            <div>
              <Skeleton className="mb-2 h-6 w-36" />
              <div className="rounded-md bg-gray-50 p-4">
                <div className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map(index => (
                    <div className="grid grid-cols-3 gap-4 py-3" key={index}>
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="col-span-2 h-5 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Skeleton className="mb-2 h-6 w-48" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7].map(index => (
                  <Skeleton className="h-5 w-full" key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-yellow-500">Ошибка загрузки</h1>
        <p className="text-gray-700">
          {error instanceof Error ? error.message : 'Произошла ошибка при загрузке деталей услуги'}
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            href={`/services/${slug}/${id}`}
          >
            Назад к услуге
          </Link>

          <Link
            className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
            href={`/services/${slug}`}
          >
            К списку услуг
          </Link>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-yellow-500">Детали не найдены</h1>

        <div className="mt-6 flex gap-4">
          <Link
            className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            href={`/services/${slug}/${id}`}
          >
            Назад к услуге
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-yellow-500">{details.name}</h1>

      <div className="max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Техническая информация</h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-xl font-medium">Спецификации</h3>
            <div className="rounded-md bg-gray-50 p-4">
              <dl className="divide-y divide-gray-200">
                <div className="grid grid-cols-3 gap-4 py-3">
                  <dt className="text-gray-500">Идентификатор</dt>
                  <dd className="col-span-2 text-gray-900">{id}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3">
                  <dt className="text-gray-500">Категория</dt>
                  <dd className="col-span-2 text-gray-900">{slug}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3">
                  <dt className="text-gray-500">Срок выполнения</dt>
                  <dd className="col-span-2 text-gray-900">{details.description}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3">
                  <dt className="text-gray-500">Стоимость</dt>
                  <dd className="col-span-2 text-gray-900">{details.price}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3">
                  <dt className="text-gray-500">Гарантия</dt>
                  <dd className="col-span-2 text-gray-900">{details.guarantee_days}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-medium">Процесс реализации</h3>
            <ol className="list-decimal space-y-2 pl-5">
              {/* {details.description?.map((step, index) => <li key={index}>{step.name}</li>)} */}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          href={`/services/${slug}/${id}`}
        >
          Назад к услуге
        </Link>

        <Link
          className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
          href={`/services/${slug}`}
        >
          К списку услуг
        </Link>
      </div>
    </div>
  );
}
