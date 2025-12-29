import Image from 'next/image';

import { rfDewiFont } from '@/app/fonts';

import { HeroActions } from './hero-actions';

export default function Hero() {
  return (
    <div className="relative flex min-h-[1080px] flex-col gap-8 overflow-hidden pt-4 md:p-8 lg:flex-row lg:p-12">
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-green-50 via-white to-green-50">
        <Image
          alt="Hero Background"
          className="object-cover"
          fill
          src="/images/hero/hero_layer_1.png"
        />
        <Image
          alt="Hero Background"
          className="object-cover opacity-90"
          fill
          src="/images/hero/hero_layer_2.png"
        />
        <div className="absolute inset-0 z-10 bg-black/60" />
        <div className="absolute right-0 bottom-0 z-20 h-full w-[90%] md:w-[60%]">
          <Image
            alt="Hero Background"
            className="object-contain object-right-bottom"
            fill
            src="/images/hero/hero_layer_3.png"
          />
        </div>
      </div>
      <div className="z-30 flex flex-col justify-end gap-8 px-4 py-20 md:px-0">
        <h1
          className={`${rfDewiFont.className} max-w-2/3 text-3xl font-black text-white xl:text-[90px]`}
        >
          Ремонт <br /> игровой <br /> техники, пк, <br />
          <span
            className={`${rfDewiFont.className} text-primary text-3xl font-black xl:text-[90px]`}
          >
            приставок
          </span>
        </h1>
        <p className="text-xl text-white xl:max-w-[40%]">
          Наш сервис специализируется на ремонте игровых консолей, компьютеров и аксессуаров. Мы
          предлагаем профессиональный ремонт любого уровня сложности, используя оригинальные
          запчасти и современное оборудование.
        </p>
        <HeroActions />
      </div>
    </div>
  );
}
