import { Box, Section, Text } from '@radix-ui/themes';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { oswaldStyle } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { type Promotion, promotionApi } from '@/entities/promotion';
import SectionTitle from '@/shared/section-title';

import { ModalControll } from './components/client/modal-controll';

export const metadata: Metadata = {
  title: 'Акции',
  description:
    'Актуальные акции и специальные предложения на ремонт бытовой техники. Выгодные цены и скидки для наших клиентов.',
};

function PromotionCard({ promotion }: { promotion: Promotion }) {
  return (
    <Link href={`/promotion/${promotion.slug}`}>
      <Card className="group relative flex h-full min-h-[400px] flex-col overflow-hidden border-none bg-white transition-all hover:shadow-xl">
        <div className="relative h-48 w-full overflow-hidden sm:h-56 md:h-64">
          <Image
            alt={promotion.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            src={promotion.image}
          />
          {promotion.discount && (
            <div className="absolute top-4 right-4 rounded-full bg-primary px-4 py-2 text-white shadow-lg">
              <span className="text-lg font-bold" style={oswaldStyle}>
                {promotion.discount}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl" style={oswaldStyle}>
            {promotion.title}
          </h3>
          <Text className="flex-1 text-base text-gray-600 sm:text-lg">
            {promotion.shortDescription}
          </Text>
          {promotion.validUntil && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Image alt="Действует до" height={16} src="/icons/clock.svg" width={16} />
              <span>Действует до {promotion.validUntil}</span>
            </div>
          )}
          <Button className="mt-auto w-full bg-primary text-base font-medium transition-opacity hover:opacity-90 sm:text-lg">
            Подробнее
          </Button>
        </div>
      </Card>
    </Link>
  );
}

export default async function Promition() {
  const promotions = await promotionApi.getPromotions();

  return (
    <div className="flex w-full max-w-[100vw] flex-col">
      <Section className="px-4 py-8 md:px-12 md:py-8">
        <Box>
          <SectionTitle badgeTitle="специальные предложения" className="mb-8" title="Акции" />
          <Text className="text-center text-base text-gray-600 md:text-lg lg:text-xl">
            Воспользуйтесь нашими выгодными предложениями и акциями на ремонт техники
          </Text>
        </Box>
      </Section>

      <Section className="px-4 py-4 md:px-12 md:py-6 lg:py-6">
        <Box>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
            {promotions.map(promotion => (
              <PromotionCard key={promotion.id || promotion.slug} promotion={promotion} />
            ))}
          </div>
        </Box>
      </Section>

      <Section className="px-4 md:px-12">
        <Box>
          <div className="rounded-lg bg-primary p-8 text-white md:p-12">
            <h3 className="mb-4 text-2xl font-semibold md:text-3xl lg:text-4xl" style={oswaldStyle}>
              Не нашли подходящую акцию?
            </h3>
            <Text className="mb-6 text-base md:text-lg">
              Свяжитесь с нами, и мы подберем для вас индивидуальное предложение
            </Text>
            <ModalControll
              title="Связаться с нами"
              trigger={
                <Button
                  className="ml-4 border-white bg-white text-base font-medium text-primary hover:bg-gray-100 md:text-lg"
                  variant="outline"
                >
                  Связаться с нами
                </Button>
              }
            />
          </div>
        </Box>
      </Section>

      <Section className="px-4 md:px-12">
        <Box>
          <div className="rounded-lg border bg-white p-6 md:p-8">
            <h3 className="mb-4 text-xl font-semibold md:text-2xl" style={oswaldStyle}>
              Условия участия в акциях
            </h3>
            <ul className="space-y-3 text-base text-gray-700 md:text-lg">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Акции не суммируются с другими специальными предложениями и скидками</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Для участия в акции необходимо указать промокод при оформлении заказа</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Подробную информацию об условиях акций уточняйте у наших специалистов</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Организатор оставляет за собой право изменить условия акции</span>
              </li>
            </ul>
          </div>
        </Box>
      </Section>
    </div>
  );
}
