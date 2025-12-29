// Типы для аутентификации
export type AuthRequest = {
  grant_type?: string;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: number;
};

export type RefreshTokenRequest = {
  refresh_token: string;
};

export type RefreshTokenResponse = AuthResponse;

export type SendSmsRequest = {
  phone_number: number;
};

export type SendSmsResponse = string;

export type VerifySmsRequest = {
  phone_number: number;
  sms_code: number;
};

export type VerifySmsResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: number;
  base_user_id: number | null;
};

export type ValidateTokenResponse = string;

export type RecoveryPasswordRequest = {
  phone: string;
  code: string;
  new_password: string;
};

export type RecoveryPasswordResponse = string;
