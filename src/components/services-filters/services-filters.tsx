'use client';

import { useDeferredValue, useEffect, useState } from 'react';

import { useQueryParams } from '@/hooks/use-query-params';

import { useDepartmentsCrm } from '@/entities/service-crm';

import { Button } from '../ui/button';

const temporalDepartmentsSlug = ['digital', 'bytovaya-tehnika', 'master-na-chas'];

export default function ServicesFilters() {
  const { data: departments } = useDepartmentsCrm();
  const { setParam, getParam } = useQueryParams();
  const [localDepartment, setLocalDepartment] = useState<string | null>(getParam('department'));
  const deferredDepartment = useDeferredValue(localDepartment);

  useEffect(() => {
    if (deferredDepartment !== getParam('department')) {
      setParam('department', deferredDepartment);
    }
  }, [deferredDepartment, setParam, getParam]);

  const handleClickFilter = (departmentSlug: string | null) => {
    setLocalDepartment(departmentSlug);
  };

  return (
    <div className="px-4 py-3 text-white lg:px-12">
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <Button
          className="rounded-2xl text-sm whitespace-nowrap sm:text-base"
          onClick={() => handleClickFilter(null)}
          variant={localDepartment ? 'white' : 'default'}
        >
          Все
        </Button>
        {departments?.map(department => (
          <Button
            className="rounded-2xl text-sm whitespace-nowrap sm:text-base"
            key={department.id}
            onClick={() => handleClickFilter(String(temporalDepartmentsSlug[department.id - 1]))}
            variant={
              localDepartment &&
              localDepartment === String(temporalDepartmentsSlug[department.id - 1])
                ? 'default'
                : 'white'
            }
          >
            {department.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
