'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';

import { CommandInput } from '@/components/ui/command';
import { Command } from '@/components/ui/command';

import { useServiceSearch } from '@/entities/service/hooks/use-service-search';

type ICommandProps = {
  commands?: { value: string; label: string }[];
  className?: string;
  onValueChange?: (value: string) => void;
};

export const Search = ({ className, onValueChange }: ICommandProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Используем debounce для поискового запроса
  const debouncedSearchQuery = useDebounce(inputValue, 300);

  // Используем отдельный хук для поиска
  const { data: searchData, isLoading } = useServiceSearch(debouncedSearchQuery);

  // Создаем результаты поиска из полученных данных
  const searchResults =
    searchData?.flatMap(({ department, type }) =>
      type.flatMap(serviceType =>
        serviceType.items.map(service => ({
          value: `${serviceType.id}/${service.id}`,
          label: `${service.name} (${department.name} - ${serviceType.name})`,
        }))
      )
    ) || [];

  // Обработчик клика вне поповера
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
    onValueChange?.(value);
  };

  const handleFocus = () => {
    if (inputValue.trim()) {
      setOpen(true);
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/services/${value}`);
    setOpen(false);
    setInputValue('');
  };

  return (
    <div className="relative" ref={searchRef}>
      <Command className={cn('rounded-md border border-2 border-primary', className)}>
        <CommandInput
          className="h-5"
          onFocus={handleFocus}
          onValueChange={handleValueChange}
          placeholder="Поиск по сайту..."
          value={inputValue}
        />

        {/* CommandList должен быть внутри Command */}
        {open && (
          <div className="absolute top-full left-0 right-0 z-50 bg-white border-2 rounded-md shadow-lg mt-1 h-60 overflow-hidden max-w-lg">
            <div className="p-2 bg-gray-100 text-xs text-gray-600 border-b flex items-center justify-between">
              <span>Найдено: {searchResults.length} результатов</span>
              {isLoading && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Поиск...</span>
                </div>
              )}
            </div>
            <div className="h-52 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-gray-500">Поиск...</span>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map(command => (
                  <div
                    className="p-2 hover:bg-primary/20 cursor-pointer border-b border-gray-100"
                    key={command.value}
                    onClick={() => handleSelect(command.value)}
                  >
                    {command.label}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {debouncedSearchQuery.trim() ? 'Ничего не найдено' : 'Введите текст для поиска'}
                </div>
              )}
            </div>
          </div>
        )}
      </Command>
    </div>
  );
};
