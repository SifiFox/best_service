import { ClientApi } from '@/shared/api/client-api';

import {
  User,
  UserAppCurrentVersionResponse,
  UserAppResponse,
  UserAppsResponse,
  UserCreate,
  UserDeleteResponse,
  UserUpdate,
  UserUpdateResponse,
} from '../types';

export class ClientUserApi extends ClientApi {
  // Получение текущего пользователя
  async getCurrentUser(): Promise<User> {
    return this.get<User>('/users/me/');
  }

  // Обновление текущего пользователя
  async updateCurrentUser(data: UserUpdate): Promise<UserUpdateResponse> {
    return this.patch<UserUpdateResponse>('/users/me/', data);
  }

  // Удаление текущего пользователя (деактивация)
  async deleteCurrentUser(): Promise<UserDeleteResponse> {
    return this.delete<UserDeleteResponse>('/users/me/');
  }

  // Создание нового пользователя
  async createUser(data: UserCreate): Promise<User> {
    return this.post<User>('/users/create_new_user/', data);
  }

  // Получение приложений пользователя
  async getUserApps(userId: number): Promise<UserAppsResponse> {
    return this.get<UserAppsResponse>(`/users/${userId}/apps/`);
  }

  // Получение конкретного приложения пользователя
  async getUserApp(userId: number, appId: number): Promise<UserAppResponse> {
    return this.get<UserAppResponse>(`/users/${userId}/apps/${appId}`);
  }

  // Получение текущей версии приложения пользователя
  async getUserAppCurrentVersion(
    userId: number,
    appId: number
  ): Promise<UserAppCurrentVersionResponse> {
    return this.get<UserAppCurrentVersionResponse>(
      `/users/${userId}/apps/${appId}/current-version`
    );
  }
}

export const clientUserApi = new ClientUserApi();
