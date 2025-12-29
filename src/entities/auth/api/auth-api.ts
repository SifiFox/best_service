import { BaseApi } from '@/shared/api/base-api';

import {
  AuthRequest,
  AuthResponse,
  RecoveryPasswordRequest,
  RecoveryPasswordResponse,
  RefreshTokenResponse,
  SendSmsRequest,
  SendSmsResponse,
  ValidateTokenResponse,
  VerifySmsRequest,
  VerifySmsResponse,
} from '../types';

export class AuthApi extends BaseApi {
  // Авторизация
  async login(data: AuthRequest): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth', data, 'form-urlencoded');
  }

  // Обновление токена
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return this.post<RefreshTokenResponse>('/auth/refresh', { refresh_token: refreshToken });
  }

  // Отправка СМС
  async sendSms(data: SendSmsRequest): Promise<SendSmsResponse> {
    return this.post<SendSmsResponse>(`/auth/send_sms`, data);
  }

  // Верификация СМС
  async verifySms(data: VerifySmsRequest): Promise<VerifySmsResponse> {
    return this.post<VerifySmsResponse>('/auth/verify_sms', data);
  }

  // Валидация токена
  async validateToken(): Promise<ValidateTokenResponse> {
    return this.get<ValidateTokenResponse>('/auth/validate');
  }

  // Восстановление пароля
  async recoverPassword(data: RecoveryPasswordRequest): Promise<RecoveryPasswordResponse> {
    return this.post<RecoveryPasswordResponse>('/auth/recover_password', data);
  }
}

export const authApi = new AuthApi();
