'use client';

import { Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import ModalMaster from '@/components/modals/modal-master/modal-master';
import { Button } from '@/components/ui/button';

import Location from '@/shared/location/location';

export default function HeaderInfo() {
  const [masterModalState, setMasterModalState] = useState({
    isOpen: false,
  });

  const handleMasterClose = () => {
    setMasterModalState({ isOpen: false });
  };

  return (
    <nav className="mr-auto hidden gap-8 text-xs lg:flex xl:text-base">
      <Location />
      <Flex align="center" gap="2">
        <Image alt="Телефон" height={20} src="/icons/phone.svg" width={20} />
        <Link className="font-medium" href="tel:+74956003185">
          +7 (495) 600-31-85
        </Link>
      </Flex>
      <Flex align="center" gap="2">
        <Image alt="Часы работы" height={20} src="/icons/clock.svg" width={20} />
        <Text className="font-medium">9:00 - 21:00 ЕЖЕДНЕВНО</Text>
      </Flex>
      <Button
        className="cursor-pointer border-1 border-solid border-primary bg-gray-100"
        onClick={() => setMasterModalState({ isOpen: true })}
        variant="outline"
      >
        <Text className="px-5 font-medium">Обратный звонок</Text>
      </Button>

      <ModalMaster
        modalState={masterModalState}
        onClose={handleMasterClose}
        title="Заказать обратный звонок"
      />
    </nav>
  );
}
