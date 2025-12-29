import { Box, Flex, Section, Text } from '@radix-ui/themes';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { oswaldStyle } from '@/lib/utils';

import FormMain from '@/components/forms/form-main/form-main';
import { Button } from '@/components/ui/button';

import { MAIL, OK_URL, PHONE, PHONE_TEL, TG_URL, VK_URL } from '@/shared/constants';
import SectionTitle from '@/shared/section-title';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Свяжитесь с нами по телефону, электронной почте или посетите наш офис. Мы всегда рады помочь вам!',
};

const SOCIAL_LINKS = [
  {
    name: 'ВКонтакте',
    url: VK_URL,
    icon: '/icons/vk.svg',
    description: 'Новости и акции',
  },
  {
    name: 'Одноклассники',
    url: OK_URL,
    icon: '/icons/ok.svg',
    description: 'Фото работ',
  },
  {
    name: 'Телеграм',
    url: TG_URL,
    icon: '/icons/tg.svg',
    description: 'Быстрая связь',
  },
];

const CONTACT_METHODS = [
  {
    icon: '/icons/phone.svg',
    title: 'Позвоните нам',
    description: 'Ежедневно с 9:00 до 18:00',
    action: PHONE,
    actionLabel: 'Позвонить',
    href: `tel:${PHONE_TEL}`,
    gradient: 'from-yellow-500 to-pink-500',
  },
  {
    icon: '/icons/tg.svg',
    title: 'Напишите в Telegram',
    description: 'Отвечаем в течение 15 минут',
    action: 'Открыть чат',
    actionLabel: 'Написать',
    href: TG_URL,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '/icons/vk.svg',
    title: 'Напишите ВКонтакте',
    description: 'Быстрая консультация',
    action: 'Открыть диалог',
    actionLabel: 'Написать',
    href: VK_URL,
    gradient: 'from-blue-600 to-indigo-600',
  },
];

const WORK_SCHEDULE = [
  { day: 'Понедельник', time: '9:00 - 18:00' },
  { day: 'Вторник', time: '9:00 - 18:00' },
  { day: 'Среда', time: '9:00 - 18:00' },
  { day: 'Четверг', time: '9:00 - 18:00' },
  { day: 'Пятница', time: '9:00 - 18:00' },
  { day: 'Суббота', time: 'Выходной' },
  { day: 'Воскресенье', time: 'Выходной' },
];

const FEATURES = [
  {
    icon: '/icons/master.svg',
    title: 'Опытные мастера',
    description: 'Более 8 лет на рынке ремонта техники',
  },
  {
    icon: '/icons/clock.svg',
    title: 'Быстрый ремонт',
    description: 'Выезд мастера в день обращения',
  },
  {
    icon: '/icons/heart.svg',
    title: 'Гарантия качества',
    description: 'До 12 месяцев на выполненные работы',
  },
  {
    icon: '/icons/geo.svg',
    title: 'Выезд на дом',
    description: 'Бесплатная диагностика на месте',
  },
];

export default function Contacts() {
  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <div className="relative px-4 py-12 md:px-12 md:pb-20 lg:py-28">
        <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-yellow-50 via-white to-orange-50" />
        <Box className="mx-auto max-w-7xl">
          <SectionTitle
            badgeTitle="свяжитесь с нами"
            className="mb-6 md:mb-8 lg:mb-10"
            title="Контакты"
          />
          <Text className="mx-auto max-w-3xl text-center text-base text-gray-600 md:text-lg lg:text-xl">
            Мы всегда на связи и готовы помочь вам с ремонтом техники. Выберите удобный способ связи
            или посетите наш офис.
          </Text>
        </Box>
      </div>

      {/* Contact Methods - Modern Cards */}
      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {CONTACT_METHODS.map((method, index) => (
              <Link
                className="group"
                href={method.href}
                key={index}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                target={method.href.startsWith('http') ? '_blank' : undefined}
              >
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${method.gradient} shadow-lg`}
                  >
                    <Image
                      alt={method.title}
                      className="h-8 w-8 brightness-0 invert"
                      height={32}
                      src={method.icon}
                      width={32}
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900" style={oswaldStyle}>
                      {method.title}
                    </h3>
                    <p className="mb-3 text-sm text-gray-600">{method.description}</p>
                    <p className="text-base font-medium text-gray-900">{method.action}</p>
                  </div>
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:text-[#3DA000]">
                      {method.actionLabel}
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Box>
      </Section>

      {/* Address & Schedule Section */}
      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Address Card */}
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-pink-500">
                  <Image
                    alt="Адрес"
                    className="brightness-0 invert"
                    height={28}
                    src="/icons/geo.svg"
                    width={28}
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-semibold" style={oswaldStyle}>
                    Наш адрес
                  </h3>
                  <p className="mb-4 text-base text-gray-600">
                    Приезжайте в наш сервисный центр для консультации или оставления техники на
                    ремонт
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4">
                <p className="text-lg font-medium text-gray-900">
                  г. Еманжелинск, ул. Островского, 7
                </p>
                <p className="text-sm text-gray-600">Челябинская область, Россия, 456851</p>
              </div>
              <Link
                href="https://yandex.ru/maps/-/CDdkaBwc"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button className="w-full bg-primary text-base font-medium hover:opacity-90">
                  Построить маршрут
                </Button>
              </Link>
            </div>

            {/* Schedule Card */}
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Image
                    alt="График работы"
                    className="brightness-0 invert"
                    height={28}
                    src="/icons/clock.svg"
                    width={28}
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-semibold" style={oswaldStyle}>
                    График работы
                  </h3>
                  <p className="text-base text-gray-600">
                    Мы работаем без обеда и выходных по предварительной записи
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {WORK_SCHEDULE.map((schedule, index) => (
                  <div
                    className={`flex items-center justify-between rounded-lg px-4 py-3 transition-colors ${
                      schedule.time === 'Выходной'
                        ? 'bg-gray-50 text-gray-400'
                        : 'bg-green-50 text-gray-900'
                    }`}
                    key={index}
                  >
                    <span className="text-sm font-medium">{schedule.day}</span>
                    <span className="text-sm font-semibold">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Section>

      {/* Why Choose Us */}
      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl bg-primary p-8 md:p-12">
            <h2
              className="mb-8 text-center text-3xl font-semibold text-white md:text-4xl lg:mb-12"
              style={oswaldStyle}
            >
              Почему выбирают нас
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((feature, index) => (
                <div
                  className="flex flex-col items-center gap-4 rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-lg"
                  key={index}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                    <Image
                      alt={feature.title}
                      className="brightness-0 saturate-0"
                      height={32}
                      src={feature.icon}
                      style={{
                        filter:
                          'brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(7497%) hue-rotate(357deg) brightness(98%) contrast(115%)',
                      }}
                      width={32}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white" style={oswaldStyle}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/90">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Section>

      {/* Map Section */}
      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
            <iframe
              allowFullScreen
              className="w-full"
              height="500"
              loading="lazy"
              src="https://yandex.ru/map-widget/v1/?ll=61.322891%2C54.749577&z=16&l=map&pt=61.322891,54.749577,pm2rdl"
              style={{ border: 0 }}
              title="Карта: г. Еманжелинск, ул. Островского, 7"
              width="100%"
            />
          </div>
        </Box>
      </Section>

      {/* Social Media Section */}
      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-3xl font-semibold md:text-4xl" style={oswaldStyle}>
                Мы в социальных сетях
              </h2>
              <Text className="text-base text-gray-600 md:text-lg">
                Подписывайтесь на наши страницы, чтобы быть в курсе акций и новостей
              </Text>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {SOCIAL_LINKS.map((social, index) => (
                <Link
                  className="group"
                  href={social.url}
                  key={index}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-primary/10">
                      <Image
                        alt={social.name}
                        className="transition-transform group-hover:scale-110"
                        height={40}
                        src={social.icon}
                        width={40}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="mb-1 text-lg font-semibold" style={oswaldStyle}>
                        {social.name}
                      </h3>
                      <p className="text-sm text-gray-600">{social.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Box>
      </Section>

      {/* Contact Form Section */}
      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-semibold md:text-4xl" style={oswaldStyle}>
              Остались вопросы?
            </h2>
            <Text className="text-base text-gray-600 md:text-lg">
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </Text>
          </div>
          <Flex direction="column">
            <FormMain />
          </Flex>
        </Box>
      </Section>

      {/* Bottom Info Section */}
      <Section className="px-4 md:px-12">
        <Box className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
            <h3 className="mb-4 text-xl font-semibold md:text-2xl" style={oswaldStyle}>
              Юридическая информация
            </h3>
            <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
              <div>
                <p className="mb-2">
                  <span className="font-medium text-gray-900">Организация:</span> ООО "ДОМ
                  ИНДУСТРИИ"
                </p>
                <p className="mb-2">
                  <span className="font-medium text-gray-900">ОГРН:</span> 1237400041394
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-medium text-gray-900">Email:</span>{' '}
                  <Link
                    className="text-primary hover:text-[#3DA000] hover:underline"
                    href={`mailto:${MAIL}`}
                  >
                    {MAIL}
                  </Link>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Телефон:</span>{' '}
                  <Link className="text-primary hover:text-[#3DA000]" href={`tel:${PHONE_TEL}`}>
                    {PHONE}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Section>
    </div>
  );
}
