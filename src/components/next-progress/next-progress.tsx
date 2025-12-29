'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import { useEffect } from 'react';

// Настройка NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: 'ease',
  speed: 200,
});

function NextNProgressClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Завершаем прогресс при изменении маршрута
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Обработчик кликов по ссылкам
    const handleLinkClick = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');

      // Проверяем, что клик не был на кнопке или элементе с data-no-progress
      const isButton = target.closest('button') || target.hasAttribute('data-no-progress');

      if (
        link &&
        link.href &&
        !link.href.startsWith('#') &&
        !link.target &&
        !link.download &&
        !isButton
      ) {
        try {
          const url = new URL(link.href);
          const currentUrl = new URL(window.location.href);

          // Проверяем, что это внутренняя ссылка и она отличается от текущей
          if (
            url.origin === currentUrl.origin &&
            (url.pathname !== currentUrl.pathname || url.search !== currentUrl.search)
          ) {
            NProgress.start();
          }
        } catch {
          // Игнорируем ошибки парсинга URL
        }
      }
    };

    // Обработчик для кнопки "Назад" браузера
    const handlePopState = (): void => {
      NProgress.start();
    };

    // Добавляем обработчики только на клиенте
    if (typeof window !== 'undefined') {
      document.addEventListener('click', handleLinkClick, true);
      window.addEventListener('popstate', handlePopState);

      return () => {
        document.removeEventListener('click', handleLinkClick, true);
        window.removeEventListener('popstate', handlePopState);
        NProgress.done();
      };
    }
    // Возвращаем пустую функцию очистки для серверного рендеринга
    return () => {};
  }, []);

  return null;
}

export default NextNProgressClient;
