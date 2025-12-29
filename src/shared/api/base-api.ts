import { getAuthCookies } from '@/auth/nextjs/cookie-actions';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://service-industry.ru/api';

export class BaseApi {
  protected async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    let authToken: string | null = null;
    try {
      const authCookies = await getAuthCookies();
      authToken = authCookies.access_token || null;
    } catch {
      // eslint-disable-next-line no-console
      console.warn('Не удалось получить токен из cookies:');
    }

    const headers: Record<string, string> = {
      ...((options?.headers as Record<string, string>) || {}),
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if ('message' in errorData) {
          errorMessage = errorData.message;
        } else if ('detail' in errorData) {
          errorMessage = errorData.detail;
        }
      } catch {
        // eslint-disable-next-line no-console
        console.warn('Не удалось получить ошибку из cookies');
      }

      throw new Error(errorMessage);
    }

    return response.json();
  }

  protected async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const query = searchParams.toString();
    const url = query ? `${endpoint}?${query}` : endpoint;

    return this.request<T>(url);
  }

  protected async post<T>(endpoint: string, data?: unknown, contentType?: string): Promise<T> {
    const headers: Record<string, string> = {};

    if (contentType === 'form-urlencoded') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else {
      headers['Content-Type'] = 'application/json';
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      headers,
      body: data
        ? contentType === 'form-urlencoded'
          ? this.toFormData(data)
          : JSON.stringify(data)
        : undefined,
    });
  }

  protected async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async patch<T>(endpoint: string, data?: unknown, contentType?: string): Promise<T> {
    const headers: Record<string, string> = {};

    if (contentType === 'form-urlencoded') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else {
      headers['Content-Type'] = 'application/json';
    }

    return this.request<T>(endpoint, {
      method: 'PATCH',
      headers,
      body: data
        ? contentType === 'form-urlencoded'
          ? this.toFormData(data)
          : JSON.stringify(data)
        : undefined,
    });
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  private toFormData(data: unknown): string {
    if (typeof data === 'object' && data !== null) {
      const formData = new URLSearchParams();
      Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      return formData.toString();
    }
    return '';
  }
}
