import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import FormVacancy from '@/components/forms/form-vacancy/form-vacancy';
import { Button } from '@/components/ui/button';

import { siteSeo } from '@/seo/config';

export default function VacanciesPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="relative min-h-[236px] md:h-[887px] bg-gray-100 mb-6 md:mb-20">
          <div className="flex z-10 relative flex-col items-center justify-center py-8 md:h-full px-4 md:px-12 max-w-full md:max-w-[60%] mx-auto">
            <div className="relative">
              <Image
                alt="line"
                className="absolute -left-20 -top-40 w-[200px] md:w-[550px] h-auto"
                height={50}
                src="/images/vacancies/lines/line6.svg"
                width={550}
              />
              <h1 className="text-4xl md:text-7xl font-bold mb-8 text-center">
                <span className="relative">
                  Мы{' '}
                  <Image
                    alt="line"
                    className="absolute -left-5 md:-left-14 -bottom-3 md:-bottom-8 w-[30px] md:w-[72px] h-auto"
                    height={50}
                    src="/images/vacancies/lines/line2.svg"
                    width={72}
                  />
                </span>{' '}
                в поисках{' '}
                <span className="relative">
                  талантов
                  <Image
                    alt="line"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[550px] h-auto"
                    height={50}
                    src="/images/vacancies/lines/line7.svg"
                    width={550}
                  />
                </span>
                !
              </h1>
            </div>
            <p className="text-lg md:text-3xl leading-8 md:leading-12 text-center mb-12">
              Вы профессионал своего дела или, напротив, <br className="hidden md:block" /> новичок,
              желающий учиться и развиваться? <br className="hidden md:block" /> Возможно, наш
              дружный коллектив ждёт именно Вас. <br className="hidden md:block" /> Почему бы не
              проверить это?
            </p>
            <Button asChild className="h-[60px] md:h-[100px] px-10 md:px-20 !text-xl md:!text-4xl">
              <Link href="#form-vacancy">Присоединиться</Link>
            </Button>
          </div>
          <div className="relative md:absolute top-0 left-0 w-full h-[236px] md:h-full flex flex-col md:flex-row justify-between -z-0">
            <Image
              alt="hero-bg"
              className="object-contain object-left h-[236px] md:h-full"
              fill
              src="/images/vacancies/vacancies_main_left.svg"
            />
            <Image
              alt="hero-bg"
              className="object-contain object-right h-[236px] md:h-full"
              fill
              src="/images/vacancies/vacancies_main_right.svg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 md:px-12 mb-6 md:mb-20">
          <h3 className="text-2xl md:text-6xl font-semibold mb-6 lg:mb-12">
            Преимущества работы с нами
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col justify-between gap-8 bg-primary/20 p-4 md:p-10 rounded-3xl">
              <div className="flex flex-col gap-4">
                <p className="text-2xl md:text-3xl font-semibold">Гибкий график работы</p>
                <p className="text-xl">
                  Мы понимаем важность баланса между работой и личной жизнью. Поэтому предлагаем
                  гибкий график, позволяющий эффективно распределять рабочее время и уделять
                  внимание личным делам.
                </p>
              </div>
              <div className="size-20 relative self-end">
                <Image
                  alt="hero-bg"
                  className="object-contain"
                  fill
                  src="/images/vacancies/vacancies_card_icon_1.svg"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 bg-primary/20 p-4 md:p-10 rounded-3xl">
              <div className="flex flex-col gap-4">
                <p className="text-2xl md:text-3xl font-semibold">Карьерный рост</p>
                <p className="text-xl">
                  У нас открыты двери для амбициозных сотрудников, готовых развиваться вместе с
                  компанией. Регулярные оценки эффективности и прозрачная система карьерного
                  продвижения позволяют каждому сотруднику расти профессионально и достигать новых
                  высот.
                </p>
              </div>
              <div className="size-20 relative self-end">
                <Image
                  alt="hero-bg"
                  className="object-contain"
                  fill
                  src="/images/vacancies/vacancies_card_icon_2.svg"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 bg-primary/20 p-4 md:p-10 rounded-3xl">
              <div className="flex flex-col gap-4">
                <p className="text-2xl md:text-3xl font-semibold">Копроративная жизнь</p>
                <p className="text-xl">
                  Дружелюбная атмосфера внутри коллектива способствует комфортному взаимодействию
                  коллег. Мы организуем совместные мероприятия, тимбилдинги и корпоративные
                  праздники, способствующие укреплению командного духа и созданию дружеской
                  атмосферы.
                </p>
              </div>
              <div className="size-20 relative self-end">
                <Image
                  alt="hero-bg"
                  className="object-contain"
                  fill
                  src="/images/vacancies/vacancies_card_icon_3.svg"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 bg-primary/20 p-4 md:p-10 rounded-3xl">
              <div className="flex flex-col gap-4">
                <p className="text-2xl md:text-3xl font-semibold">Стабильный доход</p>
                <p className="text-xl">
                  Наши сотрудники получают стабильную заработную плату, соответствующую рынку труда.
                  Благодаря прозрачной системе мотивации и премирования каждый сотрудник имеет
                  возможность увеличить свой доход благодаря усердной работе и профессиональному
                  росту.
                </p>
              </div>
              <div className="size-20 relative self-end">
                <Image
                  alt="hero-bg"
                  className="object-contain"
                  fill
                  src="/images/vacancies/vacancies_card_icon_4.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 md:px-12 mb-6 md:mb-20">
          <h3 className="text-2xl md:text-6xl font-semibold mb-6 lg:mb-12">Вакансии</h3>
          <div className="flex gap-10 flex-col xl:flex-row">
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white shadow-lg p-4 md:p-10 rounded-3xl">
              <div className="size-[150px] md:size-[280px] relative rounded-3xl overflow-hidden flex-shrink-0">
                <Image alt="icon" fill src="/images/vacancies/1.png" />
              </div>
              <div className="flex flex-col gap-4 justify-between">
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                  Менеджер по работе с клиентами
                </p>
                <p className="text-base md:text-lg lg:text-xl">
                  Можешь часами говорить по телефону? Умеешь консультировать клиентов и отвечать на
                  их вопросы? Оставляй отклик и ожидай звонка от твоего будущего коллеги!.
                </p>
                <p className="text-base md:text-lg lg:text-xl">Тебя ждут:</p>
                <ul className="list-disc list-inside">
                  <li>
                    <span>Копроративная жизнь</span>
                  </li>
                  <li>
                    <span>Доброжелательный коллектив</span>
                  </li>
                  <li>
                    <span>Карьерный рост</span>
                  </li>
                  <li>
                    <span>Стабильная заработная плата</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white shadow-lg p-4 md:p-10 rounded-3xl">
              <div className="size-[150px] md:size-[280px] relative rounded-3xl overflow-hidden flex-shrink-0">
                <Image alt="icon" fill src="/images/vacancies/2.png" />
              </div>
              <div className="flex flex-col gap-4 justify-between">
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold">Сервисный инженер</p>
                <p className="text-base md:text-lg lg:text-xl">
                  Cилен в знаниях техники? Встреча с клиентом тебя не страшит? Тогда эта вакансия
                  для тебя! Оставляй отклик и ожидай. Будущий коллега уже разбирает твой отклик!
                </p>
                <p className="text-base md:text-lg lg:text-xl">Тебя ждут:</p>
                <ul className="list-disc list-inside">
                  <li>
                    <span>Ежедневные выплаты</span>
                  </li>
                  <li>
                    <span>Интересный коллектив</span>
                  </li>
                  <li>
                    <span>Корпоративная жизнь</span>
                  </li>
                  <li>
                    <span>Карьерный рост</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 md:px-12 mb-6 md:mb-20">
          <div className="flex justify-between flex-col md:flex-row bg-gray-100 pr-0 md:pr-20 py-10 gap-4 md:gap-0">
            <div className="flex flex-col gap-4 justify-between">
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl md:text-6xl font-bold text-center">
                  <span className="relative">
                    З
                    <Image
                      alt="line"
                      className="absolute -left-5 md:-left-6 -bottom-3 md:-bottom-2 w-[72px] h-auto"
                      height={62}
                      src="/images/vacancies/lines/line2.svg"
                      width={72}
                    />
                  </span>
                  аинтересовала <br /> вакансия?{' '}
                </h2>
                <p className="max-w-full md:max-w-[80%] mx-auto text-center text-lg md:text-xl">
                  Свяжитесь с нами сегодня, и мы обсудим условия нашего взимовыгодного
                  сотрудничества!
                </p>
              </div>
              <div className="w-full h-[260px] md:h-[450px] mx-auto shrink-0 relative">
                <Image
                  alt="icon"
                  className="object-cover"
                  fill
                  src="/images/vacancies/vacancies_form_people.png"
                />
              </div>
            </div>
            <div className="flex-1 p-4 md:p-10 bg-white shadow-lg" id="form-vacancy">
              <FormVacancy />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: `Вакансии — работа в компании ${siteSeo.siteName}`,
  description:
    'Открытые вакансии: менеджер по работе с клиентами, сервисный инженер и др. Присоединяйтесь к команде Лучший сервис.',
  keywords: [
    ...(siteSeo.keywords || []),
    'вакансии',
    'работа сервисный инженер',
    'работа менеджер по работе с клиентами',
  ],
  alternates: { canonical: `${siteSeo.siteUrl.replace(/\/$/, '')}/vacancies` },
  openGraph: {
    title: `Вакансии — работа в компании ${siteSeo.siteName}`,
    description:
      'Открытые вакансии: менеджер по работе с клиентами, сервисный инженер и др. Присоединяйтесь к команде Лучший сервис.',
    url: `${siteSeo.siteUrl.replace(/\/$/, '')}/vacancies`,
    images: [{ url: siteSeo.defaultOgImage }],
    type: 'website',
    siteName: siteSeo.siteName,
    locale: siteSeo.locale,
  },
};
