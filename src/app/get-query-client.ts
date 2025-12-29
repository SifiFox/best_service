import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 минута
      },
      dehydrate: {
        // Включаем в дегидратацию все запросы, включая ожидающие
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
        shouldRedactErrors: () => {
          // Не обрабатываем ошибки Next.js, т.к. это механизм
          // для обнаружения динамических страниц
          return false;
        },
      },
    },
  });
}

// Используем cache() из React для того, чтобы создать один QueryClient на запрос
export const getQueryClient = cache(() => makeQueryClient());
