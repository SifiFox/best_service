import { BaseApi } from '@/shared/api/base-api';

import {
  DepartmentsCrmResponse,
  ServiceCrmResponse,
  ServicesCrmResponse,
  ServiceTypeCrmResponse,
} from '../types';

export class ServiceCrmApi extends BaseApi {
  // Получение списка всех сервисов
  async getServices(): Promise<ServicesCrmResponse> {
    return this.get<ServicesCrmResponse>('/service-list/');
  }

  // Получение конкретного сервиса
  async getService(serviceId: number): Promise<ServiceCrmResponse> {
    return this.get<ServiceCrmResponse>(`/service/${serviceId}`);
  }

  // Получение всех типов сервисов
  async getServiceTypes(): Promise<ServiceTypeCrmResponse> {
    return this.get<ServiceTypeCrmResponse>('/service-types/');
  }

  // Получение сервисов по типу
  async getServicesByType(typeId: number): Promise<ServicesCrmResponse> {
    return this.get<ServicesCrmResponse>(`/get-services-by-type/${typeId}`);
  }

  // Получение списка отделов
  async getDepartments(): Promise<DepartmentsCrmResponse> {
    return this.get<DepartmentsCrmResponse>('/department-list/');
  }
}

export const serviceCrmApi = new ServiceCrmApi();
