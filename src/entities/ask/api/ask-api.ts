import { BaseApi } from '@/shared/api/base-api';

import { AskCreateRequest, AskCreateResponse } from '../types';

export class AskApi extends BaseApi {
  // Создание вопроса
  async createAsk(data: AskCreateRequest): Promise<AskCreateResponse> {
    try {
      return await this.post<AskCreateResponse>('/askingforms/', data);
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message
          ? `Не удалось отправить заявку: ${error.message}`
          : 'Не удалось отправить заявку. Попробуйте позже.';
      throw new Error(errorMessage);
    }
  }
}

export const askApi = new AskApi();
