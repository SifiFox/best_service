import { useQuery } from '@tanstack/react-query';

import { serviceCrmApi } from '../api/service-crm-api';
import { ServiceCrm } from '../types';

// Типы для группировки сервисов
export type GroupedCategory = {
  name: string;
  items: ServiceCrm[];
};

export type GroupedServices = {
  byType: GroupedCategory[];
  byDepartment: GroupedCategory[];
  byTypeAndDepartment: GroupedCategory[];
};

// Функция для группировки сервисов
function groupServices(services: ServiceCrm[]): GroupedServices {
  const byTypeMap: Record<string, ServiceCrm[]> = {};
  const byDepartmentMap: Record<string, ServiceCrm[]> = {};
  const byTypeAndDepartmentMap: Record<string, Record<string, ServiceCrm[]>> = {};

  services.forEach(service => {
    const typeName = service.type?.name || 'Без типа';
    const departmentName = service.department?.name || 'Без отдела';

    // Группировка по типу
    if (!byTypeMap[typeName]) {
      byTypeMap[typeName] = [];
    }
    byTypeMap[typeName].push(service);

    // Группировка по отделу
    if (!byDepartmentMap[departmentName]) {
      byDepartmentMap[departmentName] = [];
    }
    byDepartmentMap[departmentName].push(service);

    // Группировка по типу и отделу
    if (!byTypeAndDepartmentMap[typeName]) {
      byTypeAndDepartmentMap[typeName] = {};
    }
    if (!byTypeAndDepartmentMap[typeName][departmentName]) {
      byTypeAndDepartmentMap[typeName][departmentName] = [];
    }
    byTypeAndDepartmentMap[typeName][departmentName].push(service);
  });

  // Преобразуем в массивы объектов
  const byType: GroupedCategory[] = Object.entries(byTypeMap).map(([name, items]) => ({
    name,
    items,
  }));

  const byDepartment: GroupedCategory[] = Object.entries(byDepartmentMap).map(([name, items]) => ({
    name,
    items,
  }));

  const byTypeAndDepartment: GroupedCategory[] = Object.entries(byTypeAndDepartmentMap).flatMap(
    ([typeName, departments]) =>
      Object.entries(departments).map(([departmentName, items]) => ({
        name: `${typeName} - ${departmentName}`,
        items,
      }))
  );

  return {
    byType,
    byDepartment,
    byTypeAndDepartment,
  };
}

// Хук для получения всех сервисов с группировкой
export function useServicesCrm() {
  const query = useQuery({
    queryKey: ['services-crm'],
    queryFn: () => serviceCrmApi.getServices(),
    staleTime: 10 * 60 * 1000, // 10 минут
  });

  // Добавляем группировку к результату
  const groupedData = query.data ? groupServices(query.data) : null;

  return {
    ...query,
    data: query.data,
    groupedData,
  };
}

// Хук для получения конкретного сервиса
export function useServiceCrm(serviceId: number) {
  return useQuery({
    queryKey: ['service-crm', serviceId],
    queryFn: () => serviceCrmApi.getService(serviceId),
    enabled: !!serviceId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Хук для получения типов сервисов
export function useServiceTypesCrm() {
  return useQuery({
    queryKey: ['service-types-crm'],
    queryFn: () => serviceCrmApi.getServiceTypes(),
    staleTime: 10 * 60 * 1000, // 10 минут
  });
}

// Хук для получения сервисов по типу с группировкой
export function useServicesByTypeCrm(typeId: number) {
  const query = useQuery({
    queryKey: ['services-by-type-crm', typeId],
    queryFn: () => serviceCrmApi.getServicesByType(typeId),
    enabled: !!typeId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });

  // Добавляем группировку к результату
  const groupedData = query.data ? groupServices(query.data) : null;

  return {
    ...query,
    data: query.data,
    groupedData,
  };
}

// Хук для получения только группированных сервисов
export function useGroupedServicesCrm() {
  const { groupedData, ...rest } = useServicesCrm();

  return {
    ...rest,
    data: groupedData,
  };
}

// Хук для получения только группированных сервисов по типу
export function useGroupedServicesByTypeCrm(typeId: number) {
  const { groupedData, ...rest } = useServicesByTypeCrm(typeId);

  return {
    ...rest,
    data: groupedData,
  };
}

export function useDepartmentsCrm() {
  return useQuery({
    queryKey: ['departments-crm'],
    queryFn: () => serviceCrmApi.getDepartments(),
    staleTime: 10 * 60 * 1000, // 10 минут
  });
}

// Хук для получения только группированных отделов
export function useGroupedDepartmentsCrm() {
  const { data, ...rest } = useDepartmentsCrm();

  return {
    ...rest,
    data: data ? data.map(dept => ({ name: dept.name, items: [] })) : null,
  };
}
