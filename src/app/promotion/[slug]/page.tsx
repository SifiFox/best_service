import { Box, Flex, Section, Text } from '@radix-ui/themes';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { oswaldStyle } from '@/lib/utils';

import FormMain from '@/components/forms/form-main/form-main';
import { Button } from '@/components/ui/button';

import { promotionApi } from '@/entities/promotion';

type PromotionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const promotions = await promotionApi.getPromotions();
  return promotions.map(p => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PromotionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const promotion = await promotionApi.getPromotionBySlug(slug);

    if (!promotion) {
      return {
        title: 'Акция не найдена',
      };
    }

    return {
      title: promotion.title,
      description: promotion.shortDescription,
    };
  } catch {
    return {
      title: 'Акция не найдена',
    };
  }
}

export default async function PromotionDetailPage({ params }: PromotionDetailPageProps) {
  const { slug } = await params;
  let promotion;
  let relatedPromotions;

  try {
    promotion = await promotionApi.getPromotionBySlug(slug);
  } catch {
    notFound();
  }

  if (!promotion) {
    notFound();
  }

  try {
    relatedPromotions = await promotionApi
      .getPromotions()
      .then(promotions => promotions.filter(p => p.slug !== promotion.slug).slice(0, 3));
  } catch {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <Section className="relative px-4 pt-8 pb-12 md:px-12 md:pt-16 md:pb-20">
        <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-green-50 via-white to-green-50" />
        <Box className="mx-auto max-w-7xl">
          <div className="mb-6">
            <Link
              className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary"
              href="/promotion"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Назад к акциям
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative h-[300px] overflow-hidden rounded-2xl shadow-lg md:h-[400px] lg:h-[500px]">
              <Image
                alt={promotion.title}
                className="object-cover"
                fill
                priority
                src={promotion.detailImage || promotion.image}
              />
              {promotion.discount && (
                <div className="absolute top-6 right-6 rounded-full bg-primary px-6 py-3 text-white shadow-lg">
                  <span className="text-2xl font-bold" style={oswaldStyle}>
                    {promotion.discount}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h1
                  className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl"
                  style={oswaldStyle}
                >
                  {promotion.title}
                </h1>
                {promotion.validUntil && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                    <Image alt="Действует до" height={16} src="/icons/clock.svg" width={16} />
                    <span>Действует до {promotion.validUntil}</span>
                  </div>
                )}
              </div>

              <Text className="text-lg text-gray-700 md:text-xl">{promotion.fullDescription}</Text>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link className="flex-1" href="/contacts">
                  <Button className="w-full bg-primary text-base font-medium hover:opacity-90 md:text-lg">
                    Воспользоваться акцией
                  </Button>
                </Link>
                <Link className="flex-1" href="/services">
                  <Button
                    className="w-full border-2 border-primary text-base font-medium text-primary hover:bg-primary/10 md:text-lg"
                    variant="outline"
                  >
                    Выбрать услугу
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Box>
      </Section>

      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl bg-primary p-8 md:p-12">
            <h2
              className="mb-8 text-center text-3xl font-semibold text-white md:text-4xl"
              style={oswaldStyle}
            >
              Преимущества акции
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {promotion.benefits.map((benefit, index) => (
                <div
                  className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
                  key={index}
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white">
                    <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        clipRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-base text-white/90 md:text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Section>

      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl" style={oswaldStyle}>
            Как воспользоваться
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {promotion.howToUse.map((step, index) => (
              <div className="flex flex-col items-center gap-4 text-center" key={index}>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#92E800] text-2xl font-bold text-white shadow-lg">
                  {index + 1}
                </div>
                <p className="text-base text-gray-700 md:text-lg">{step}</p>
              </div>
            ))}
          </div>
        </Box>
      </Section>

      {promotion.examples && promotion.examples.length > 0 && (
        <Section className="px-4 md:px-12">
          <Box className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl" style={oswaldStyle}>
              Примеры экономии
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {promotion.examples.map((example, index) => (
                <div
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  key={index}
                >
                  <h3 className="mb-3 text-xl font-semibold" style={oswaldStyle}>
                    {example.title}
                  </h3>
                  <p className="text-base text-gray-600">{example.description}</p>
                </div>
              ))}
            </div>
          </Box>
        </Section>
      )}

      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
            <h3 className="mb-6 text-2xl font-semibold md:text-3xl" style={oswaldStyle}>
              Условия участия
            </h3>
            <ul className="space-y-3">
              {promotion.terms.map((term, index) => (
                <li className="flex gap-3 text-base text-gray-700 md:text-lg" key={index}>
                  <span className="text-primary">•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Section>

      {promotion.faq && promotion.faq.length > 0 && (
        <Section className="px-4 md:px-12">
          <Box className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl" style={oswaldStyle}>
              Частые вопросы
            </h2>
            <div className="space-y-4">
              {promotion.faq.map((item, index) => (
                <div
                  className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md"
                  key={index}
                >
                  <h4 className="mb-3 text-lg font-semibold md:text-xl" style={oswaldStyle}>
                    {item.question}
                  </h4>
                  <p className="text-base text-gray-600 md:text-lg">{item.answer}</p>
                </div>
              ))}
            </div>
          </Box>
        </Section>
      )}

      {relatedPromotions.length > 0 && (
        <Section className="px-4 md:px-12">
          <Box className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl" style={oswaldStyle}>
              Другие акции
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPromotions.map(relatedPromo => (
                <Link
                  className="group"
                  href={`/promotion/${relatedPromo.slug}`}
                  key={relatedPromo.slug}
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        alt={relatedPromo.title}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        fill
                        src={relatedPromo.image}
                      />
                      {relatedPromo.discount && (
                        <div className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-white shadow-lg">
                          <span className="text-sm font-bold" style={oswaldStyle}>
                            {relatedPromo.discount}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-4">
                      <h3 className="text-lg font-semibold" style={oswaldStyle}>
                        {relatedPromo.title}
                      </h3>
                      <p className="flex-1 text-sm text-gray-600">
                        {relatedPromo.shortDescription}
                      </p>
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        Подробнее →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Box>
        </Section>
      )}

      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-semibold md:text-4xl" style={oswaldStyle}>
              Хотите воспользоваться акцией?
            </h2>
            <Text className="text-base text-gray-600 md:text-lg">
              Оставьте заявку, и мы свяжемся с вами в ближайшее время
            </Text>
          </div>
          <Flex direction="column">
            <FormMain />
          </Flex>
        </Box>
      </Section>
    </div>
  );
}
