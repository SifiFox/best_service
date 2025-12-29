'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import ModalConfigurator from '@/components/modals/modal-configurator/modal-configurator';

import { rfDewiFont } from '@/app/fonts';

import { Button } from '../ui/button';

export default function Promotion() {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10 px-4 lg:px-0 2xl:flex-row">
      <div className="bg-primary relative flex flex-1 flex-col gap-6 overflow-hidden rounded-xl p-6 text-white lg:rounded-4xl lg:p-20">
        <div className="absolute right-0 bottom-0 hidden lg:block">
          <Image alt="Promotion" height={500} src="/images/hero/hero_layer_3.png" width={500} />
        </div>
        <p className={`${rfDewiFont.className} text-4xl font-bold`}>
          ХОЧЕШЬ СОБРАТЬ <br /> КОМПЬЮТЕР СВОЕЙ <br /> МЕЧТЫ?
        </p>
        <p className="text-xl">
          Выбирай мощность, стиль и технологии <br /> по собственным правилам — с нашим <br />
          конфигуратором это просто!
        </p>
        <Button
          className="h-[100px] w-full px-10 text-2xl! font-semibold! text-white lg:w-fit lg:px-20"
          onClick={() => setIsConfiguratorOpen(true)}
          variant="outline"
        >
          КОНФИГУРАТОР
        </Button>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-8 rounded-xl bg-gray-200 p-6 lg:rounded-4xl lg:p-20 2xl:max-w-[670px]">
        <div className="flex flex-col text-3xl font-bold uppercase md:text-5xl 2xl:text-3xl">
          <span className={`${rfDewiFont.className} text-primary`}>
            Больше <br /> сборок
          </span>
          <span className={`${rfDewiFont.className} text-black`}>
            Смотрите <br /> в каталоге
          </span>
        </div>
        <Link href="/services">
          <Button
            className="h-[120px] w-full px-15 text-2xl! font-semibold! text-white"
            variant="primary"
          >
            СМОТРЕТЬ КАТАЛОГ
          </Button>
        </Link>
      </div>

      <ModalConfigurator isOpen={isConfiguratorOpen} onClose={() => setIsConfiguratorOpen(false)} />
    </div>
  );
}
