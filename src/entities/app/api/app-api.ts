import { BaseApi } from '@/shared/api/base-api';

import { AppLatestVersionResponse, AppsResponse, AppVersionsResponse } from '../types';

export class AppApi extends BaseApi {
  // Получение всех приложений
  async getAllApps(): Promise<AppsResponse> {
    return this.get<AppsResponse>('/apps/');
  }

  // Получение всех версий приложения
  async getAppVersions(appId: number): Promise<AppVersionsResponse> {
    return this.get<AppVersionsResponse>(`/apps/${appId}/versions`);
  }

  // Получение последней версии приложения
  async getAppLatestVersion(appId: number): Promise<AppLatestVersionResponse> {
    return this.get<AppLatestVersionResponse>(`/apps/${appId}/latest_version`);
  }
}

export const appApi = new AppApi();
