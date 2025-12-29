'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type UseQueryParamsOptions = {
  replace?: boolean;
  scroll?: boolean;
};

export function useQueryParams(options: UseQueryParamsOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentParams, setCurrentParams] = useState(searchParams);

  useEffect(() => {
    setCurrentParams(searchParams);
  }, [searchParams]);

  const setParam = useCallback(
    (key: string, value: string | number | null) => {
      const params = new URLSearchParams(currentParams);

      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      if (options.replace) {
        router.replace(url, { scroll: options.scroll ?? false });
      } else {
        router.push(url, { scroll: options.scroll ?? false });
      }
    },
    [router, currentParams, pathname, options.replace, options.scroll]
  );

  const setMultipleParams = useCallback(
    (params: Record<string, string | number | null>) => {
      const newParams = new URLSearchParams(currentParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, value.toString());
        }
      });

      const queryString = newParams.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      if (options.replace) {
        router.replace(url, { scroll: options.scroll ?? false });
      } else {
        router.push(url, { scroll: options.scroll ?? false });
      }
    },
    [router, currentParams, pathname, options.replace, options.scroll]
  );

  const removeParam = useCallback(
    (key: string) => {
      setParam(key, null);
    },
    [setParam]
  );

  const getParam = useCallback(
    (key: string): string | null => {
      return currentParams.get(key);
    },
    [currentParams]
  );

  const getAllParams = useCallback(() => {
    const params: Record<string, string> = {};
    currentParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [currentParams]);

  const clearAllParams = useCallback(() => {
    if (options.replace) {
      router.replace(pathname, { scroll: options.scroll ?? false });
    } else {
      router.push(pathname, { scroll: options.scroll ?? false });
    }
  }, [router, pathname, options.replace, options.scroll]);

  return {
    setParam,
    setMultipleParams,
    removeParam,
    getParam,
    getAllParams,
    clearAllParams,
    searchParams: currentParams,
  };
}
