import { BaseApi } from '@/shared/api/base-api';

import { VacancyCreateRequest, VacancyCreateResponse } from '../types';

export class VacancyApi extends BaseApi {
  async createVacancy(data: VacancyCreateRequest): Promise<VacancyCreateResponse> {
    return this.post<VacancyCreateResponse>('/vacancy/', data);
  }
}

export const vacancyApi = new VacancyApi();
