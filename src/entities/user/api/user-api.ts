import { BaseApi } from '@/shared/api/base-api';

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

export class UserApi extends BaseApi {
  async getCurrentUser(): Promise<User> {
    return this.get<User>('/users/me/');
  }

  async updateCurrentUser(data: UserUpdate): Promise<UserUpdateResponse> {
    return this.patch<UserUpdateResponse>('/users/me/', data);
  }

  async deleteCurrentUser(): Promise<UserDeleteResponse> {
    return this.delete<UserDeleteResponse>('/users/me/');
  }

  async createUser(data: UserCreate): Promise<User> {
    return this.post<User>('/users/create_new_user/', data);
  }

  async getUserApps(userId: number): Promise<UserAppsResponse> {
    return this.get<UserAppsResponse>(`/users/${userId}/apps/`);
  }

  async getUserApp(userId: number, appId: number): Promise<UserAppResponse> {
    return this.get<UserAppResponse>(`/users/${userId}/apps/${appId}`);
  }

  async getUserAppCurrentVersion(
    userId: number,
    appId: number
  ): Promise<UserAppCurrentVersionResponse> {
    return this.get<UserAppCurrentVersionResponse>(
      `/users/${userId}/apps/${appId}/current-version`
    );
  }
}

export const userApi = new UserApi();
