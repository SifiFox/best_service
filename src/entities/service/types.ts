import {
  Department,
  Service as ServiceBase,
  ServiceType,
  ServiceTypeWithItems,
} from '@/shared/types/api';

// Переименовываем для обратной совместимости
export type ServiceCategory = ServiceType;

export type Service = ServiceBase;

export type ServiceDetails = {
  id: number;
  name: string;
  type: ServiceType;
  department: Department;
  description: string | null;
  price: string | null;
  guarantee_days: string | null;
  img: string | null;
  color: number | null;
};

// Тип для группированных сервисов по департаментам
export type GroupedServicesByDepartment = {
  id: number;
  department: Department;
  type: ServiceTypeWithItems[];
};

// Параметры для запроса группированных сервисов
export type ServicesQueryParams = {
  search?: string;
  limit?: number;
  department?: string | number;
};
