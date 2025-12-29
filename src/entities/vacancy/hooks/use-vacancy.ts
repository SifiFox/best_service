import { useMutation } from '@tanstack/react-query';

import { vacancyApi } from '../api/vacancy-api';

export function useCreateVacancy() {
  return useMutation({
    mutationFn: (data: {
      name: string | null;
      email: string | null;
      phone: string;
      city: number | string;
    }) => vacancyApi.createVacancy(data),
  });
}
