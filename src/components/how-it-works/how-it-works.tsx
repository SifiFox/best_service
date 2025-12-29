import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { LinkArrow } from '@/components/ui/icons';

import { rfDewiFont } from '@/app/fonts';
import SectionTitle from '@/shared/section-title';

import { Badge } from '../ui/badge';

export default function HowItWorks() {
  return (
    <div className="px-4 md:px-0">
      <div className="mb-20 flex flex-col gap-4 text-left md:flex-row md:justify-between md:text-right">
        <SectionTitle badgeTitle="НАЧИНАЕТСЯ ЗДЕСЬ" title="ИГРОВОЙ МИР" />
        <div className="flex flex-col gap-4">
          <p className="text-base md:text-xl lg:max-w-2xl">
            Ремонт игровых устройств и сборка мощных ПК <br /> — сделаем вашу игру незабываемой!
          </p>
          <p className="text-base md:text-xl lg:max-w-2xl">
            Присоединяйтесь к миллионам геймеров, <br /> чьи игры ожили благодаря нашей работе.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-1 md:grid-rows-2">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
          <Card
            background="/images/how-it-works/1.png"
            badge="Hous Team"
            title={
              <p className={`${rfDewiFont.className} text-2xl font-bold md:text-5xl`}>
                СБОРКА ПК <br /> ПОД КЛЮЧ
              </p>
            }
          />
          <div className="grid grid-cols-1 grid-rows-2 gap-4">
            <Card
              background="/images/how-it-works/2.png"
              badge="Hous Team"
              className="pb-4"
              title={
                <p className={`${rfDewiFont.className} text-2xl font-bold md:text-3xl`}>
                  РЕМОНТ ПК
                </p>
              }
            />
            <Card
              background="/images/how-it-works/3.png"
              badge="Hous Team"
              className="pb-4"
              title={
                <p className={`${rfDewiFont.className} text-2xl font-bold md:text-3xl`}>
                  РЕМОНТ <br /> НОУТБУКОВ
                </p>
              }
            />
          </div>
          <div className="grid grid-cols-1 grid-rows-3 gap-4">
            <Card
              background="/images/how-it-works/4.png"
              badge="Hous Team"
              className="pt-25 pb-4"
              title={
                <p className={`${rfDewiFont.className} text-2xl font-bold md:text-xl`}>
                  РЕМОНТ ИГРОВЫХ <br /> КОНСОЛЕЙ
                </p>
              }
            />
            <Card
              background="/images/how-it-works/5.png"
              badge="Hous Team"
              className="pt-25 pb-4"
              title={
                <p className={`${rfDewiFont.className} text-2xl font-bold md:text-xl`}>
                  РЕМОНТ <br /> ДЖОЙСТИКОВ
                </p>
              }
            />
            <Card
              background="/images/how-it-works/6.png"
              badge="Hous Team"
              className="pt-25 pb-4"
              title={
                <p className={`${rfDewiFont.className} text-2xl font-bold md:text-xl`}>
                  ПРЕДУСТАНОВКА <br /> WINDOWS 10/11
                </p>
              }
            />
          </div>
        </div>
        <Card
          background="/images/how-it-works/7.png"
          chips={['Выгодно', 'Надежно', 'Быстро', 'Лучшее предложение']}
          className="justify-center"
          link="full"
          subtitle={
            <p className="hidden max-w-lg text-xl md:block">
              Humbleteam creates visually striking and effective brand systems that prioritize
              digital experiences and interactions but seamlessly
            </p>
          }
          title={
            <p
              className={`${rfDewiFont.className} pb-5 text-2xl leading-tight font-bold tracking-wider md:pb-0 md:text-xl xl:text-6xl`}
            >
              АКЦИИ НА <br /> КАЖДЫЙ ДЕНЬ
            </p>
          }
        />
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  badge,
  background,
  className,
  link,
  chips,
  url = '/promotion',
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: string;
  background?: string;
  className?: string;
  link?: 'short' | 'full';
  chips?: string[];
  url?: string;
}) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-2xl',
        !background && 'bg-red-500'
      )}
    >
      {background && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background})` }}
        />
      )}
      {chips && (
        <div className="absolute top-5 right-10 hidden max-w-md flex-wrap justify-end gap-2 md:flex">
          {chips.map(chip => (
            <Badge
              className="flex items-center gap-2 rounded-full rounded-none bg-white px-3 py-1 text-sm text-black"
              key={chip}
              variant="default"
            >
              {chip}
            </Badge>
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div
        className={cn(
          'relative z-10 flex h-full flex-col justify-end gap-4 px-6 pt-15 pb-8 text-white lg:px-10',
          className
        )}
      >
        {badge && (
          <div className="absolute top-5 left-10">
            <Badge
              className="flex items-center gap-2 rounded-full bg-white px-3 py-1"
              variant="default"
            >
              <Image alt={badge} height={20} src="/images/how-it-works/badge_icon.svg" width={20} />
              <span className="text-md font-regular text-black">{badge}</span>
            </Badge>
          </div>
        )}
        <div className="absolute right-5 bottom-5">
          <Link
            className={cn(
              link === 'full' && 'md:rounded-full md:bg-white md:px-4 md:py-2',
              'flex items-center gap-4'
            )}
            href={url}
          >
            {link === 'full' && (
              <p className="hidden text-sm text-xl text-black md:block">Смотреть предложения</p>
            )}
            {link === 'full' ? (
              <LinkArrow className="md:text-primary size-9" />
            ) : (
              <LinkArrow className="size-9 text-white" />
            )}
          </Link>
        </div>
        {title}
        {subtitle && subtitle}
      </div>
    </div>
  );
}
