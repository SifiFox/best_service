'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { useSelectedCity } from '@/hooks/use-selected-city';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { type CityCrm, useCities } from '@/entities/city';

export default function Location({
  view = 'default',
  className,
}: {
  view?: 'default' | 'header';
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: cities, isLoading: citiesLoading } = useCities();
  const { selectedCity, setSelectedCity, isLoading: selectedCityLoading } = useSelectedCity();

  const handleCitySelect = (city: CityCrm) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  if (selectedCityLoading) {
    return (
      <div className="flex w-fit">
        <Button disabled variant="ghost">
          <div className="flex items-center gap-2">
            <Image alt="Гео" height={24} src="/icons/geo.svg" width={17} />
            {view === 'default' && <span className="font-medium">Загрузка...</span>}
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-fit text-white">
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild className="w-fit">
          <Button className={cn('w-full p-0', className)} variant="transparent">
            <div className="flex w-fit cursor-pointer items-center gap-2">
              {view === 'header' ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 ">
                  <Image
                    alt="Гео"
                    className="brightness-0 invert"
                    height={16}
                    src="/icons/geo.svg"
                    width={11}
                  />
                </div>
              ) : (
                <Image
                  alt="Гео"
                  className="brightness-0 invert"
                  height={24}
                  src="/icons/geo.svg"
                  width={13}
                />
              )}
              {view === 'default' && (
                <span className="font-medium">г. {selectedCity?.name || 'Выберите город'}</span>
              )}
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogTitle>Выберите ваш город</DialogTitle>
          <div className="mt-4">
            {citiesLoading ? (
              <div className="py-4 text-center">Загрузка городов...</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {cities?.map(city => (
                  <Button
                    className="cursor-pointer justify-start text-sm"
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    size="sm"
                    variant={selectedCity?.id === city.id ? 'default' : 'outline'}
                  >
                    {city.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
