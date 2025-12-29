'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { CityCrm, useCities } from '@/entities/city';
import { useCurrentUser, useUpdateCurrentUser } from '@/entities/user/hooks/use-user';

const SELECTED_CITY_KEY = 'selectedCity';

export function useSelectedCity() {
  const [selectedCity, setSelectedCityState] = useState<CityCrm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: user } = useCurrentUser();
  const updateUser = useUpdateCurrentUser();
  const { data: cities } = useCities();

  useEffect(() => {
    if (user && cities) {
      const userCity = cities.find(city => city.id === user.city_id);
      if (userCity) {
        setSelectedCityState(userCity);
        localStorage.setItem(SELECTED_CITY_KEY, JSON.stringify(userCity));
      } else {
        const defaultCity = cities[0] || { id: 1, name: 'Москва' };
        setSelectedCityState(defaultCity);
        localStorage.setItem(SELECTED_CITY_KEY, JSON.stringify(defaultCity));
      }
    } else if (!user && cities) {
      const savedCity = localStorage.getItem(SELECTED_CITY_KEY);
      if (savedCity) {
        try {
          const city = JSON.parse(savedCity) as CityCrm;
          setSelectedCityState(city);
        } catch {
          localStorage.removeItem(SELECTED_CITY_KEY);
          const defaultCity = cities[0] || { id: 1, name: 'Москва' };
          setSelectedCityState(defaultCity);
          localStorage.setItem(SELECTED_CITY_KEY, JSON.stringify(defaultCity));
        }
      } else {
        const defaultCity = cities[0] || { id: 1, name: 'Москва' };
        setSelectedCityState(defaultCity);
        localStorage.setItem(SELECTED_CITY_KEY, JSON.stringify(defaultCity));
      }
    }
    setIsLoading(false);
  }, [user, cities]);

  const setSelectedCity = async (city: CityCrm) => {
    if (user) {
      try {
        await updateUser.mutateAsync({
          city_id: city.id,
        });
        setSelectedCityState(city);
        toast.success(`Город изменен на ${city.name}`);
      } catch {
        toast.error('Ошибка при изменении данных пользователя');
      }
    } else {
      localStorage.setItem(SELECTED_CITY_KEY, JSON.stringify(city));
      setSelectedCityState(city);
    }
  };

  return {
    selectedCity,
    setSelectedCity,
    isLoading,
  };
}
