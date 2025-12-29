// Экспорт типов
export type {
  DepartmentCrm,
  DepartmentsCrmResponse,
  ServiceCrm,
  ServiceCrmResponse,
  ServicesCrmResponse,
  ServiceTypeCrm,
  ServiceTypeCrmResponse,
} from './types';

// Экспорт типов для группировки
export type { GroupedCategory, GroupedServices } from './hooks/use-service-crm';

// Экспорт API
export { serviceCrmApi } from './api/service-crm-api';

// Экспорт хуков
export {
  useDepartmentsCrm,
  useGroupedDepartmentsCrm,
  useGroupedServicesByTypeCrm,
  useGroupedServicesCrm,
  useServiceCrm,
  useServicesByTypeCrm,
  useServicesCrm,
  useServiceTypesCrm,
} from './hooks/use-service-crm';
