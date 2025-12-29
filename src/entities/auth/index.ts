// Экспорт типов
export type {
  AuthRequest,
  AuthResponse,
  RecoveryPasswordRequest,
  RecoveryPasswordResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SendSmsRequest,
  SendSmsResponse,
  ValidateTokenResponse,
  VerifySmsRequest,
  VerifySmsResponse,
} from './types';

// Экспорт API
export { authApi } from './api/auth-api';

// Экспорт хуков
export {
  useLogin,
  useLogout,
  useRecoverPassword,
  useRefreshToken,
  useSendSms,
  useValidateToken,
  useVerifySms,
} from './hooks/use-auth';
