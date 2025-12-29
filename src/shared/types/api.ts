// Общие типы для API ответов
export type ApiResponse<T> = {
  data: T;
  message: string;
  status: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  message: string;
  status: number;
};

// Типы для ошибок API
export type ApiError = {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
};

// Типы для валидации
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};

export type HTTPValidationError = {
  detail: ValidationError[];
};

// Базовые типы
export type Address = {
  city: string | null;
  street: string | null;
  house: string | null;
  apartment: string | null;
};

export type StatusBase = {
  id: number;
  name: string;
  color: number | null;
};

export type Department = {
  id: number;
  name: string;
  color: string | null;
  slug: string;
};

export type ServiceType = {
  id: number;
  name: string;
  color: number | null;
  svg_icon: string | null;
  img_header: string | null;
  img: string | null;
};

export type City = {
  id: number;
  name: string;
};

export type TokenBase = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type PaymentBase = {
  created_at: string;
  paid_at: string | null;
  status_id: number;
  user_id: number;
  app_id: number;
  subscribe_type_id: number;
};

export type PaymentNotification = {
  OrderId: number;
  Status: string;
  RebillId: number;
};

export type SubscriptionTypeSchema = {
  name: string;
  description: string | null;
  price: string;
  term_days: number;
  id: number;
};

export type SubscriptionSchema = {
  start_date: string;
  end_date: string;
  app_id: number;
  subscription_type_id: number;
  auto_update: number;
  id: number;
  subscription_type: SubscriptionTypeSchema | null;
};

export type AppVersionSchema = {
  version: string;
  release_date: string;
  id: number;
  app_id: number;
  download_link: string;
};

export type AppSchema = {
  id: number;
  name: string;
  description: string | null;
  hash_sum: string | null;
  versions: AppVersionSchema[];
};

export type UserBase = {
  id?: number;
  username: string | null;
  email: string | null;
  phone: number | null;
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;
  city_id: number;
  is_active: boolean;
  password?: string;
  social_link?: string[] | null;
};

export type UserCreate = UserBase & {
  password: string;
};

export type UserUpdateSchema = {
  email: string | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;
  city_id: number;
  phone: number | null;
  social_link: string[] | null;
};

export type MasterBase = {
  id: number;
  last_location: {
    latitude: string;
    longitude: string;
    updated_at: string;
  };
  name: string;
  profile: { avatar: string | null };
  avatar: string | null;
};

// Типы для аутентификации
export type BodyTokenAuthPost = {
  grant_type: string | null;
  username: string;
  password: string;
  scope: string;
  client_id: string | null;
  client_secret: string | null;
};

// Типы для вопросов
export type AskCreate = {
  phone: string; // 5-20 символов
  name?: string | null; // ≤ 50 символов
  email?: string | null; // email
  message?: string | null; // ≤ 4096 символов
};

export type AskResponse = AskCreate & {
  id: number;
  created_at: string;
};

// Типы для корзины
export type CartServiceItemCreate = {
  service_id: number;
  quantity: number; // > 0, по умолчанию 1
};

// Типы для заказов
export type OrderServiceCreate = {
  description: string | null;
  address: Address;
  phone: number | null;
  email: string | null;
  client_name: string | null;
  client_id: number | null;
  payment_type_id: number;
  cart: CartServiceItemCreate[];
};

export type OrderService = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  type: ServiceType;
  department: Department;
  slug: string;
  guarantee_days: string;
  img: string;
  description: string | null;
  color: number | null;
};

export type OrderServiceResponse = {
  address: string;
  comment: string;
  crm_request_id: string | null;
  crm_lead_id: string | null;
  id: number;
  status: StatusBase;
  original_status: StatusBase;
  city: number;
  client: number;
  time_create: string;
  last_modified: string;
  total_price: number;
  master: MasterBase;
  services: OrderService[];
};

// Типы для вакансий
export type VacancyBase = {
  name: string | null; // ≤ 50 символов
  email: string | null; // email
  phone: string; // 5-20 символов
  city: number | string;
};

export type VacancyCreate = VacancyBase;

// Типы для сервисов
export type Service = {
  id: number;
  name: string;
  type: ServiceType;
  department: Department;
  description: string | null;
  price: string | null;
  guarantee_days: string | null;
  img: string | null;
  img_header: string | null;
  color: number | null;
};

export type ServiceTypeWithItems = {
  id: number;
  name: string;
  color: number | null;
  svg_icon: string | null;
  img_header: string | null;
  img: string | null;
  slug: string;
  items: Service[];
};

// Типы для платежей Т-Банка
export type PaymentSchema = {
  Success: boolean;
  ErrorCode: string | null;
  TerminalKey: string | null;
  Status: string;
  PaymentId: string;
  OrderId: string | null;
  Amount: number;
  PaymentURL: string | null;
};

export type OrderSchema = {
  Success: boolean;
  ErrorCode: string;
  Message: string;
  TerminalKey: string;
  OrderId: string;
  Payments: PaymentSchema[];
};

// Типы для подтверждения телефона
export type PhoneRequest = {
  phone_number: number;
};

export type PhoneConfirm = {
  phone_number: number;
  sms_code: number;
};

// Типы для восстановления пароля
export type RecoveryPasswordRequest = {
  phone: string;
  code: string;
  new_password: string;
};
