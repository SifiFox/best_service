import { cn } from '@/lib/utils';

import { LinkArrow, Percent } from '@/components/ui/icons';

import SectionTitle from '@/shared/section-title';

export default function About() {
  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-col gap-20">
        <SectionTitle badgeTitle="ПОЧЕМУ МЫ ЛУЧШИЕ" title="ЛУЧШИЙ СЕРВИС" />
        <div className="flex flex-col gap-10 2xl:flex-row">
          <p className="text-base md:text-xl lg:max-w-2xl">
            Наша компания по ремонту игровой техники предлагает уникальные решения, которые сочетают
            профессионализм, скорость и качество. Мы не просто ремонтируем компьютеры — мы заботимся
            о каждом клиенте и стремимся сделать ваш опыт максимально комфортным.
          </p>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <PercentageCard
              description="Удовлетворенность клиентов благодаря быстрому и качественному ремонту."
              percentage={98}
              value={98}
            />
            <PercentageCard
              description="Экономия времени благодаря оперативной диагностике и ремонту."
              percentage={75}
              value={50}
            />
            <PercentageCard
              description="Шансов на повторный ремонт благодаря тщательной проверке и тестированию после ремонта."
              percentage={0}
              value={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PercentageCard({
  percentage,
  description,
  value,
}: {
  percentage: number;
  description: string;
  value: number;
}) {
  const fillPercentage = 100 - value;

  const isSplit = value === 50;
  const isFullGradient = value === 0;

  return (
    <div className="relative flex min-h-[350px] flex-1 flex-col overflow-hidden rounded-2xl bg-gray-200 p-6 md:min-h-[600px] xl:min-h-[706px]">
      <div
        className="bg-gradient-primary absolute top-0 left-0 w-full transition-all duration-500"
        style={{ height: `${fillPercentage}%` }}
      />
      <div className="relative z-10 flex flex-1 flex-col">
        <div
          className={cn(
            'flex flex-1 flex-col',
            value === 98 && 'justify-start pt-10 text-black',
            value === 0 && 'justify-end pb-10 text-white',
            isSplit && 'justify-center'
          )}
        >
          {isSplit ? (
            <>
              <div className="absolute top-0 left-0 flex h-[50%] w-full flex-col justify-end">
                <div className="flex items-end gap-2 font-medium text-white text-9xl">
                  {percentage} <Percent className="size-10 md:size-15" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 flex h-[50%] w-full flex-col justify-start pt-4">
                <p className="text-base font-medium text-black md:text-lg">{description}</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-end gap-2 font-medium text-9xl">
                {percentage} <Percent className="size-10 md:size-15" />
              </div>
              <p className="text-base font-medium md:text-lg">{description}</p>
            </div>
          )}
        </div>
        <div
          className={cn(
            'relative z-20 flex items-center justify-between gap-2',
            isFullGradient ? 'text-white' : 'text-black'
          )}
        >
          <p className="text-sm font-medium">
            Humbleteam <br /> creates visually
          </p>
          <LinkArrow className={cn('size-9', isFullGradient ? 'text-white' : 'text-primary')} />
        </div>
      </div>
    </div>
  );
}
