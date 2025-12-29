import { Department, Service, ServiceType } from '@/shared/types/api';

// Типы для сервисов CRM
export type ServiceCrm = Service;

export type ServicesCrmResponse = ServiceCrm[];

export type ServiceCrmResponse = ServiceCrm;

// Типы для типов сервисов
export type ServiceTypeCrm = ServiceType;

export type ServiceTypeCrmResponse = ServiceTypeCrm[];

// Типы для отделов
export type DepartmentCrm = Department;

export type DepartmentsCrmResponse = DepartmentCrm[];
