import { useMutation } from '@tanstack/react-query';

import { askApi } from '../api/ask-api';

// Хук для создания вопроса
export function useCreateAsk() {
  return useMutation({
    mutationFn: (data: {
      phone: string;
      name: string | null;
      email: string | null;
      message: string | null;
    }) => askApi.createAsk(data),
  });
}
