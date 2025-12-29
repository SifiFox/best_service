type ApiClientConfig = {
  baseUrl?: string;
  headers?: Record<string, string>;
};

export class ApiError extends Error {
  public readonly status: number;
  public readonly data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || '/api';
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>('GET', url);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>('POST', this.buildUrl(endpoint), data);
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>('PUT', this.buildUrl(endpoint), data);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', this.buildUrl(endpoint));
  }

  private async request<T>(method: string, url: string, data?: unknown): Promise<T> {
    const options: RequestInit = {
      method,
      headers: this.headers,
      credentials: 'include',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    // Обработка ответа
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Произошла ошибка при обработке запроса' };
      }

      throw new ApiError(
        errorData.message || `HTTP ошибка ${response.status}`,
        response.status,
        errorData
      );
    }

    // Для пустых ответов (например, при удалении ресурса)
    if (response.status === 204) {
      return {} as T;
    }

    // Парсинг JSON ответа
    try {
      return await response.json();
    } catch {
      throw new ApiError('Ошибка при парсинге JSON ответа', 500);
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    let url = `${this.baseUrl}/${normalizedEndpoint}`;

    if (params && Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams();

      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      }

      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return url;
  }
}
