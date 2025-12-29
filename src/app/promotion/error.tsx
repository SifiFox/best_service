'use client';

import Link from 'next/link';

import { oswaldStyle } from '@/lib/utils';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex w-full flex-col items-center justify-center py-20 px-4 md:px-12 text-center">
      <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl" style={oswaldStyle}>
        Что-то пошло не так!
      </h2>
      <p className="mb-8 max-w-lg text-lg text-gray-600">
        К сожалению, при загрузке акций произошла ошибка. Мы уже работаем над её устранением.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={reset} size="lg">
          Попробовать снова
        </Button>
        <Link href="/">
          <Button size="lg" variant="outline">
            На главную
          </Button>
        </Link>
      </div>
    </div>
  );
}
