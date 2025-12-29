import { BaseApi } from '@/shared/api/base-api';

import { CitiesCrmResponse } from '../types';

export class CityApi extends BaseApi {
  // Получение всех городов из CRM
  async getCities(): Promise<CitiesCrmResponse> {
    return this.get<CitiesCrmResponse>('/cities/');
  }
}

export const cityApi = new CityApi();
