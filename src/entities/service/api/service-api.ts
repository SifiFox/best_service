import { BaseApi } from '@/shared/api/base-api';

import {
  GroupedServicesByDepartment,
  Service,
  ServiceCategory,
  ServiceDetails,
  ServicesQueryParams,
} from '../types';

class ServiceApiClient extends BaseApi {
  // Получение всех типов услуг (категорий)
  async getServiceCategories(): Promise<ServiceCategory[]> {
    return this.get<ServiceCategory[]>('/service-types/');
  }

  // Получение услуг по типу
  async getServicesByCategory(typeId: number): Promise<Service[]> {
    return this.get<Service[]>(`/get-services-by-type/${typeId}`);
  }

  // Получение конкретной услуги
  async getServiceById(serviceId: number): Promise<Service> {
    return this.get<Service>(`/service/${serviceId}`);
  }

  // Получение детальной информации об услуге
  async getServiceDetails(serviceId: number): Promise<ServiceDetails> {
    return this.get<ServiceDetails>(`/service/${serviceId}`);
  }

  // Получение группированных сервисов по департаментам
  async getGroupedServices(params?: ServicesQueryParams): Promise<GroupedServicesByDepartment[]> {
    const searchParams = new URLSearchParams();

    if (params?.search) {
      searchParams.append('search', params.search);
    }
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    if (params?.department) {
      searchParams.append('department', params.department.toString());
    }

    const queryString = searchParams.toString();
    const url = queryString ? `/services?${queryString}` : '/services';

    return this.get<GroupedServicesByDepartment[]>(url);
  }
}

export const serviceApi = new ServiceApiClient();
