import Image from 'next/image';

import SectionTitle from '@/shared/section-title';

export default function OurMission() {
  return (
    <div>
      <SectionTitle
        badgeTitle="Индустрия"
        className="mb-5 lg:mb-15"
        title="Миссия нашей компании"
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="relative w-full overflow-hidden rounded-2xl lg:w-[60%] lg:rounded-4xl">
          <div className="absolute top-0 left-0 -z-5 h-full w-full">
            <Image alt="our-mission" className="object-cover" fill src="/images/mission-bg-1.png" />
          </div>
          <div className="relative flex min-h-fit w-full flex-col gap-4 overflow-hidden rounded-xl p-4 lg:min-h-[588px] lg:flex-row lg:gap-6 lg:rounded-2xl lg:p-8">
            <div className="relative hidden h-[200px] w-full overflow-hidden rounded-xl lg:block lg:h-[508px] lg:w-[150px] lg:flex-shrink-0 lg:rounded-2xl xl:w-[200px] 2xl:w-[280px]">
              <Image
                alt="our-mission"
                className="object-cover object-top"
                fill
                src="/images/master.png"
              />
            </div>
            <div className="flex flex-col text-white">
              <div className="relative mb-4 size-[50px] lg:mb-6 lg:size-[50px] xl:mb-8 xl:size-[75px]">
                <Image alt="our-mission" fill src="/icons/mission/mission1.svg" />
              </div>
              <div className="flex h-full flex-col justify-between">
                <div className="flex gap-6 lg:gap-8 xl:gap-15">
                  <div className="flex flex-col items-center text-center">
                    <p className="text-2xl font-semibold lg:text-3xl xl:text-5xl">5</p>
                    <p className="text-xs lg:text-sm xl:text-xl">
                      Лет на <br /> рынке
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <p className="text-2xl font-semibold lg:text-3xl xl:text-5xl">93%</p>
                    <p className="text-xs lg:text-sm xl:text-xl">
                      Довольных
                      <br />
                      клиентов
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium lg:text-base xl:text-2xl">
                  <p>
                    Мы смогли порадовать уже более 10 тысяч клиентов! Это свидетельствует о
                    надежности нашей компании, а так же высоком уровне предоставляемых услуг.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl lg:w-[20%] lg:rounded-4xl">
          <div className="absolute top-0 left-0 -z-5 h-full w-full">
            <Image alt="our-mission" className="object-cover" fill src="/images/mission-bg-2.png" />
          </div>
          <div className="relative flex min-h-fit w-full flex-col gap-4 overflow-hidden rounded-xl p-4 lg:min-h-[588px] lg:flex-row lg:gap-6 lg:rounded-2xl lg:p-8">
            <div className="flex flex-col text-white">
              <div className="relative mb-4 size-[50px] lg:mb-6 lg:size-[50px] xl:mb-8 xl:size-[75px]">
                <Image alt="our-mission" fill src="/icons/mission/mission2.svg" />
              </div>
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="text-sm font-medium lg:text-base xl:text-2xl">
                  <p>
                    Миссия нашей компании - Сохранить ваше драгоценное время и создать комфорт в
                    доме с помощью технологий и сервиса!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl lg:w-[20%] lg:rounded-4xl">
          <div className="absolute top-0 left-0 -z-5 h-full w-full">
            <Image alt="our-mission" className="object-cover" fill src="/images/mission-bg-3.png" />
          </div>
          <div className="relative flex min-h-fit w-full flex-col gap-4 overflow-hidden rounded-xl p-4 lg:min-h-[588px] lg:flex-row lg:gap-6 lg:rounded-2xl lg:p-8">
            <div className="flex flex-col text-white">
              <div className="relative mb-4 size-[50px] lg:mb-6 lg:size-[50px] xl:mb-8 xl:size-[75px]">
                <Image alt="our-mission" fill src="/icons/mission/mission3.svg" />
              </div>
              <div className="flex h-full flex-1 flex-col justify-end">
                <div className="text-sm font-medium lg:text-base xl:text-2xl">
                  <p>
                    Лучший сервис – ваш надежный сервис в ремонте и настройке любой бытовой и
                    цифровой техники у вас дома.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
