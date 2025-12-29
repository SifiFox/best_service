'use client';

import { useState } from 'react';

import ModalConfigurator from '@/components/modals/modal-configurator/modal-configurator';

import { rfDewiFont } from '@/app/fonts';

import { Button } from '../ui/button';
import Link from 'next/link';

export function HeroActions() {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <Link href="/services">
          <Button
            className={`${rfDewiFont.className} h-[100px] rounded-full px-6 py-2 text-xl font-bold tracking-wider uppercase lg:w-[380px] lg:text-3xl!`}
            variant="white"
          >
            Оформить <br /> заказ
          </Button>
        </Link>
        <Button
          className={`${rfDewiFont.className} h-[100px] rounded-full px-6 py-2 text-xl font-bold tracking-wider text-white uppercase lg:w-[380px] lg:text-3xl!`}
          onClick={() => setIsConfiguratorOpen(true)}
          variant="primary"
        >
          Собрать <br /> ПК
        </Button>
      </div>
      <ModalConfigurator isOpen={isConfiguratorOpen} onClose={() => setIsConfiguratorOpen(false)} />
    </>
  );
}
